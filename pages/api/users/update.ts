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
        throw new Error("No authorization token");
      }
      await verifyIdToken(req?.headers?.authorization);
    } catch (error) {
      return res.status(400).json({ success: false });
    }

    const { Location } = await uploadImage(
      Buffer.from(
        req.body.profilePicture.replace(/data:.*\/.*;base64,/, ""),
        "base64"
      ),
      `${req.body.userName}-profilePicture`
    );

    await dbConnect();

    try {
      const updatedUser: User = await UserModel.findByIdAndUpdate(
        req?.body?._id,
        {
          ...req?.body,
          profilePicture: Location,
        }
      );
      return res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  } else return res.status(400).json({ success: false });
}
