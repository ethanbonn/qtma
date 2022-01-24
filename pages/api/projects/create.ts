import type { NextApiRequest, NextApiResponse } from "next";
import { verifyIdToken } from "next-firebase-auth";

import type { Project } from "../../../types/models";
import dbConnect from "../../../utils/dbConnect";
import ProjectModel from "../../../models/Projects";

import mongoose from "mongoose";

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
      var current_timestamp = new Date();
      req.body = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        ...req.body,
        date_created: current_timestamp.toISOString()
      }
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
