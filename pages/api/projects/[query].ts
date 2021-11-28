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

  const query_params: Project = {};

  if (search_params.has('relationship_type')) {
    query_params["desired_relationship_type"] = search_params.get('relationship_type');
  }

  if (search_params.has('timezone')) {
    query_params["author_timezone"] = search_params.get('timezone')?.split(",");
  }

  if (search_params.has('tags')) {
    query_params["project_tags"] = search_params.get('tags')?.split(",");
  }

  if (search_params.has('skills')) {
    query_params["skill_id"] = search_params.get('skills')?.split(",");
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
