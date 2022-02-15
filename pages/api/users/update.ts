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

    let Location = req.body.profilePicture;

    // if the user has uploaded a new image, we upload it to S3
    // Location will only start with the url below if they edited their profile and did not
    // choose to upload a new photo
    if (!Location.startsWith("https://qtma-2022-team-4.s3")) {
      ({ Location } = await uploadImage(
        Buffer.from(
          req.body.profilePicture.replace(/data:.*\/.*;base64,/, ""),
          "base64"
        ),
        `${req.body._id}-profilePicture`
      ));
    }

    await dbConnect();

    try {
      console.log("request",         {
        ...req?.body,
        profilePicture: Location,
      });
      // const updatedUser: User = await UserModel.findByIdAndUpdate(
      //   req?.body?._id,
      //   {
          
      //     "$set": 
      //       {...req?.body,
      //       profilePicture: Location}
          
      //   },
      // );
      await UserModel.updateOne(
        {_id: req?.body?._id},
        {
          
          "$set": 
            {...req?.body,
            profilePicture: Location}
          
        },
      );
      // console.log("after", updatedUser);
      // return res.status(200).json({ success: true, data: updatedUser });
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
