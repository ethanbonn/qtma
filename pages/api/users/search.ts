import type { NextApiRequest, NextApiResponse } from "next";
import { verifyIdToken } from "next-firebase-auth";

import type { User } from "../../../types/models";
import dbConnect from "../../../utils/dbConnect";
import UserModel from "../../../models/User";

type Data = {
  success: boolean;
  data?: User[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  if (method === "GET") {
    await dbConnect();

    try {
    
      var users = await UserModel.find({
          "$or": [
              {
                  userName: req.body.query
              },
              {
                  firstName: req.body.query
              },
              {
                  lastName: req.body.query
              }
          ]
      });
      if (!users) throw new Error("Data not found");
      return res.status(200).json({ success: true, data: users });
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  } else return res.status(500).json({ success: false });
}
