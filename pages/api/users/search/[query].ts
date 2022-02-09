import type { NextApiRequest, NextApiResponse } from "next";
import { verifyIdToken } from "next-firebase-auth";

import type { User } from "../../../../types/models";
import dbConnect from "../../../../utils/dbConnect";
import UserModel from "../../../../models/User";

type Data = {
  success: boolean;
  data?: User[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const method = req.method;
  const queryBody = req.query;
  const query_string = queryBody.query;

  if (method === "GET") {
    await dbConnect();
    try {
    
      var users = await UserModel.find({
          "$or": [
              {
                  userName: {
                    "$regex": query_string,
                    "$options": "i"
                  }
              },
              {
                  firstName: {
                    "$regex": query_string,
                    "$options": "i"
                  }
              },
              {
                  lastName: {
                    "$regex": query_string,
                    "$options": "i"
                  }
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
