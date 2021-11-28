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

  let search_params = new URLSearchParams(query.query);

  type ProjectQuery = {
    author_timezone: string | string[] | undefined;
    desired_relationship_type: string | null;
    project_tags: string | string[] | undefined;
    skill_id: string | string[] | undefined;
  };

  const query_params: ProjectQuery = {
    "author_timezone": search_params.get("author_timezone")?.split(","),
    "desired_relationship_type": search_params.get("desired_relationship_type"),
    "project_tags": search_params.get("project_tags")?.split(","),
    "skill_id": search_params.get("skill_id")?.split(",")
  };

  for (const [key, value] of Object.entries(query_params)) {
    if (value === undefined || value === null) delete query_params[key];
  }

  if (method === "GET") {

    await dbConnect();

    try {
      const queryobj = await ProjectModel.find(query_params);
      if (!queryobj) throw new Error("Data not found");
      res.status(200).json({ success: true, data: queryobj });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else res.status(400).json({ success: false });
}
