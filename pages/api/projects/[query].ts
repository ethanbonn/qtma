import type { NextApiRequest, NextApiResponse } from "next";
import type { Project } from "../../../types/models";
import dbConnect from "../../../utils/dbConnect";
import ProjectModel from "../../../models/Projects";


// the logic needs to be re-written here for the 'search' criteria
// we need an atlas search index on it

// not sure it works for skills either (need to fix queryDB)

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
  // console.log("Query", query);
  let search_params = new URLSearchParams(query.query as string);

  var all_params; //: {[key : string] : string[]};
  if (search_params.get("query") === null) {

    // Type guard for the URl query parameters
    type ProjectQuery = {
      author_timezone: string | string[] | undefined;
      desired_relationship_type: string | null;
      search: string | null;
      skills: string | string[] | undefined;
    };

    // Set the value of an object to the provided URL query parameters
    const query_params: ProjectQuery = {
      "author_timezone": search_params.get("author_timezone")?.split(","),
      "desired_relationship_type": search_params.get("desired_relationship_type"),
      "search": search_params.get("search"),
      "skills": search_params.get("skills")?.split(",")
    };

    // Initialize some variables:
    //  all_params will be used for querying MongoDB using logical or operator
    //  obj will be used as a temporary object
    all_params  = {"$or" : []};
    // this is sketchy

    var obj;

    // Append each valid query to the logical or operation for querying in all_params
    for (const [key, value] of Object.entries(query_params)) {
      if (value === undefined || value === null)
        delete query_params[key as keyof ProjectQuery];
      else {
        // var obj: {[key: string]: typeof value} = {};
        obj = {}
        // obj[key as string] = value;
        obj[key] = value;
        console.log("ADDING: ", obj);
        console.log(typeof obj);
        console.log(typeof key, typeof value);
        all_params.$or.push(obj);
      }
    }
  }


  else all_params = {};
  console.log("ALL_PARAMS", all_params);

  if (method === "GET") {

    await dbConnect();

    try {
      const queryobj = await ProjectModel.find(all_params);
      if (!queryobj) throw new Error("Data not found");
      res.status(200).json({ success: true, data: queryobj });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else res.status(400).json({ success: false });
}
