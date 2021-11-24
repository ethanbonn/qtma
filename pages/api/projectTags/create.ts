import type { NextApiRequest, NextApiResponse } from "next";
import type { ProjectTag } from "../../../types/models";
import dbConnect from "../../../utils/dbConnect";
import ProjectTagModel from "../../../models/Projects"; // come back to this

type Data = {
  success: boolean;
  data?: ProjectTag[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    method,
    query
  } = req;

  // let search_params = new URLSearchParams(query.query);

  // const query_params: ProjectTag = {desired_relationship_type: search_params.get('relationship_type'), author_timezone: search_params.get('timezone')?.split(",")};

  //
  // if (search_params.has('tags')) {
  //   query_params["project_tags"] = search_params.get('tags')?.split(",");
  // }
  //
  // if (search_params.has('skills')) {
  //   query_params["skill_id"] = search_params.get('skills')?.split(",");
  // }

  if (method === "POST") {
    await dbConnect();

    try {
      const tag : ProjectTag = {name : "test", project_ids : []};
      await ProjectTagModel.();
      res.status(200).json({ success: true, data: queryobj });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
  // if (method === "GET") {
  //
  //   await dbConnect();
  //
  //   try {
  //     const queryobj = await ProjectModel.find(query_params);
  //     if (!queryobj) throw new Error("Data not found");
  //     res.status(200).json({ success: true, data: queryobj });
  //   } catch (error) {
  //     res.status(400).json({ success: false });
  //   }
  // }
   else res.status(400).json({ success: false });
}
