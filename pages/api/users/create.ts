import type { NextApiRequest, NextApiResponse } from "next";
import { verifyIdToken } from "next-firebase-auth";

import type { User } from "../../../types/models";
import dbConnect from "../../../utils/dbConnect";
import UserModel from "../../../models/User";
import uploadImage from "../../../utils/upload";

type Data = {
  success: boolean;
  data?: User;
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

    const { Location } = await uploadImage(
      Buffer.from(
        req.body.profilePicture.replace(/data:.*\/.*;base64,/, ""),
        "base64"
      ),
      `${req.body._id}-profilePicture`
    );
    await dbConnect();

    try {
      var current_timestamp = new Date();
      const user: User = await UserModel.create({
        ...req.body,
        profilePicture: Location,
        date_created: current_timestamp.toISOString(),
      });
      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      // duplicate username error
      if (error.code === 11000) {
        return res.status(450).json({ success: false });
      }
      return res.status(400).json({ success: false });
    }
  } else return res.status(500).json({ success: false });
}
