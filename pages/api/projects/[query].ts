import type { NextApiRequest, NextApiResponse } from "next";
import type { Project } from "../../../types/models";
import dbConnect from "../../../utils/dbConnect";
import ProjectModel from "../../../models/Projects";
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
  var search_obj = {};
  var skills_arr = [];

  if (search_params.get("query") === null) {

    // Type guard for the URl query parameters
    type ProjectQuery = {
      author_timezone: string | string[] | null | undefined;
      desired_relationship_type: string | null | undefined;
      search: string | null | undefined;
      skills: string[] | null | undefined;
    };

    // Set the value of an object to the provided URL query parameters
    const all_params: ProjectQuery = {
      "author_timezone": search_params.get("author_timezone")?.split(","),
      "desired_relationship_type": search_params.get("desired_relationship_type"),
      "search": search_params.get("search"),
      "skills": search_params.get("skills")?.split(",")
    };
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



  if (method === "GET") {

    await dbConnect();
    // if search_string

    console.log("all", all_params);
    try {

      var queryobj = [];
      if (Object.keys(search_obj).length > 0) {
        var queryobj = await ProjectModel.aggregate(
          [{             
            "$search": {
                "compound": search_obj
              }
        },
        {
          "$lookup": {
            "from": "users",
            "localField": "author_ids",
            "foreignField": "_id",
            "as": "authors",

          }
        },
        {
          "$lookup": {
            "from": "skills",
            "localField": "skill_ids",
            "foreignField": "_id",
            "as": "skills",

          }
        }
      
      ]);
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
              
              },
              
            },
            {
              "$lookup": {
                "from": "users",
                "localField": "author_ids",
                "foreignField": "_id",
                "as": "authors",

              }
            },
            {
              "$lookup": {
                "from": "skills",
                "localField": "skill_ids",
                "foreignField": "_id",
                "as": "skills",
    
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

        
        if (search_params.get("uid")){
          console.log("finding project by id");
          console.log(search_params.get("uid"));

          // var result = await ProjectModel.find({author_ids: search_params.get("uid")});
          var result = await ProjectModel.aggregate([
            {"$match": {"$expr": {"$in": [search_params.get("uid"), "$author_ids"]}}},
            {
              "$lookup": {
                "from": "users",
                "localField": "author_ids",
                "foreignField": "_id",
                "as": "authors",

              }
            },
            {
              "$lookup": {
                "from": "skills",
                "localField": "skill_ids",
                "foreignField": "_id",
                "as": "skills",
    
              }
            }
          ]);

          console.log(result);
        } else if (skills_arr.length == 0 && Object.keys(search_obj).length == 0){
            // var result = await ProjectModel.find({});
            var result = await ProjectModel.aggregate([
              {
                  $sort: { "date_created": -1 } // sort the data
              },
              {
                "$limit": 6
              }, 
              {
                "$lookup": {
                  "from": "users",
                  "localField": "author_ids",
                  "foreignField": "_id",
                  "as": "authors",
  
                }
              },
              {
                "$lookup": {
                  "from": "skills",
                  "localField": "skill_ids",
                  "foreignField": "_id",
                  "as": "skills",
      
                }
              }
              // {
              //     $group: {
              //         _id: null, // group everything into one single bucket
              //         docs: { $push: "$$ROOT" } // push all documents into an array (this will be massive for huge collections...)
              //     }
              // }, 
              // {
              //     $project: {
              //         "docsTop10": { $slice: [ "$docs", 10 ] }, // take the first 10 elements from the ASC sorted array
              //         "docsBottom10": { $reverseArray: { $slice: [ "$docs", -10 ] } } // take the last 10 elements from the array but reverse their order
              //     }
              // }
            ])
          } 
      
        if (!result) throw new Error("Data not found");
        // console.log("data queried", result);
        return res.status(200).json({ success: true, data: result });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
  }
}
