import type { NextApiRequest, NextApiResponse } from "next";
import { verifyIdToken } from "next-firebase-auth";

import type { Project } from "../../../types/models";
import dbConnect from "../../../utils/dbConnect";
import ProjectModel from "../../../models/Projects";

type Data = {
  success: boolean;
  data?: Project;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  if (method === "POST") {
    try {
      if (!req?.headers?.authorization) {
        console.log("No Auth token");
        throw new Error("No authorization token");
      }
      await verifyIdToken(req?.headers?.authorization);
    } catch (error) {
      return res.status(401).json({ success: false });
    }

    //await dbConnect();

    try {
      const proj: Project = await ProjectModel.create({
        ...req.body
      });
      return res.status(200).json({ success: true, data: proj });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false });
    }
  } else return res.status(500).json({ success: false });
}
