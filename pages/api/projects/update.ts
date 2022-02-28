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
        throw new Error("No authorization token");
      }
      await verifyIdToken(req?.headers?.authorization);
    } catch (error) {
      return res.status(400).json({ success: false });
    }

    await dbConnect();

    try {
      console.log("request", {
        ...req?.body
      });

      await ProjectModel.updateOne(
        {_id: req?.body?._id},
        {
          "$set": {
              ...req?.body
            }
        }
      );
      return res.status(200).json({success: true})
    } catch (error) {
      // duplicate username error
      if (error.code === 11000) {
        return res.status(450).json({ success: false });
      }
      return res.status(400).json({ success: false });
    }
  } else return res.status(400).json({ success: false });
}
