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
  } = req;


  if (method === "GET") {

    await dbConnect();

    try {
      const queryobj = await ProjectModel.find({ desired_relationship_type: 'collaborator' });
      if (!queryobj) throw new Error("Data not found");
      res.status(200).json({ success: true, data: queryobj });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else res.status(400).json({ success: false });
}
