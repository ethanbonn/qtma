import type { NextApiRequest, NextApiResponse } from "next";
import type { Project } from "../../../types/models";
import dbConnect from "../../../utils/dbConnect";
import ProjectModel from "../../../models/Projects";
import search from "./search";
import { forEach } from "cypress/types/lodash";


// the search is expensive and broad
// once enough data is in the db we'll need to change the query logic

type Data = {
  success: boolean;
  data?: Project[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const {
  //   method,
  //   query
  // } = req;
  const method = req.method;
  const query = req.query;

  // Retrieve the search parameters from the URL
  let search_params = new URLSearchParams(query.query as string);

  var all_params; //: {[key : string] : string[]};
  
  if (search_params.get("query") === null) {

    // Type guard for the URl query parameters
    type ProjectQuery = {
      author_timezone: string | string[] | undefined;
      desired_relationship_type: string | null;
      search: string | null;
      skills: string[] | undefined;
    };

    // Set the value of an object to the provided URL query parameters
    const all_params: ProjectQuery = {
      "author_timezone": search_params.get("author_timezone")?.split(","),
      "desired_relationship_type": search_params.get("desired_relationship_type"),
      "search": search_params.get("search"),
      "skills": search_params.get("skills")?.split(",")
    };
    var search_obj = {};
    var skills_arr = [];
    if (all_params.search && all_params.search !== "") {
      search_obj["should"] =  
        [  
          {
            text: {
              query: all_params.search,
              path: ['name', 'description']
            }
          }
        ] 
    }

    if (all_params.desired_relationship_type) {
      search_obj["filter"] =  
      [
        {
          "text": {
            "query": all_params.desired_relationship_type,  
            "path": "desired_relationship_type" 
          }
        }
      ]
        
    };

    if (all_params.skills) {
      all_params.skills.forEach(x => skills_arr.push({"name" : x}));
    }

  }


  else all_params = {};

////////////////////////////////////////////////
//////////////////////////////
  all_params = {desired_relationship_type: "sponsor", skills: ['python', 'c']};



  if (method === "GET") {

    await dbConnect();
    // if search_string
    try {
      var queryobj = [];
      if (Object.keys(search_obj).length > 0) {
        var queryobj = await ProjectModel.aggregate(
          [{             
            "$search": {
                "compound": search_obj
              }
        }]);
      }
      if (skills_arr.length > 0){
        const querySkills = await ProjectModel.aggregate([
            {
              "$match":{
                  
                "skills": {
                    "$elemMatch": {
                    "$or": skills_arr
                    }
                  }
              
              }
            }
          ]);

          // merge jsons and remove duplicates
          // won't change result if queryobj have values
          var result = queryobj.concat(querySkills).filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj.name)
              .indexOf(obj.name) == pos;
          });
        } else var result = queryobj;
          
        
        if (!result) throw new Error("Data not found");
        res.status(200).json({ success: true, data: result });
      } catch (error) {
        res.status(400).json({ success: false });
      }
    // } else res.status(400).json({ success: false });

      if ((!search_obj) && (!skills_arr)){
        try {
          const queryobj = await ProjectModel.find({});
          if (!queryobj) throw new Error("Data not found");
          res.status(200).json({ success: true, data: queryobj });
        } catch (error) {
          res.status(400).json({ success: false });
        }
    }
  }
}
