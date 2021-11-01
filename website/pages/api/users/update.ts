import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "../../../types/models";
import dbConnect from "../../../utils/dbConnect";
import UserModel from "../../../models/User";

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
    await dbConnect();

    try {
      const updatedUser: User = await UserModel.findByIdAndUpdate(
        req?.body?._id,
        req?.body
      );
      res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  } else res.status(400).json({ success: false });
}
