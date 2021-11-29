import type { NextApiRequest, NextApiResponse } from "next";
import type { Project } from "../../../types/models";
import dbConnect from "../../../utils/dbConnect";
import ProjectModel from "../../../models/Projects";

type Data = {
  success: boolean;
  data?: Project[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    method,
    query
  } = req;

  // Retrieve the search parameters from the URL
  let search_params = new URLSearchParams(query.query);

  // Type guard for the URl query parameters
  type ProjectQuery = {
    author_timezone: string | string[] | undefined;
    desired_relationship_type: string | null;
    project_tags: string | string[] | undefined;
    skills: string | string[] | undefined;
  };

  // Set the value of an object to the provided URL query parameters
  const query_params: ProjectQuery = {
    "author_timezone": search_params.get("author_timezone")?.split(","),
    "desired_relationship_type": search_params.get("desired_relationship_type"),
    "project_tags": search_params.get("project_tags")?.split(","),
    "skills": search_params.get("skills")?.split(",")
  };

  // Initialize some variables:
  //  all_params will be used for querying MongoDB using logical or operator
  //  obj will be used as a temporary object
  var all_params = {"$or": []};
  var obj;

  // Append each valid query to the logical or operation for querying in all_params
  for (const [key, value] of Object.entries(query_params)) {
    if (value === undefined || value === null)
      delete query_params[key];
    else {
      obj = {};
      obj[key] = value;
      all_params.$or.push(obj);
    }
  }

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
