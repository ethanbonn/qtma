import type { NextApiRequest, NextApiResponse } from "next";
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
  const {
    method,
    // query: { userName },
  } = req;

  if (method === "GET") {
    await dbConnect();

    try {
    //   if (typeof userName !== "string") throw new Error("Invalid userName");
    //   const user = await UserModel.findOne({ userName });
    var users = await UserModel.aggregate([
        {
            $sort: { "date_created": -1 } // sort the data
        },
        {
          "$lookup": {
            "from": "skills",
            "localField": "skill_ids",
            "foreignField": "_id",
            "as": "skills",

          }
        },
        {
          "$limit": 6
        }, 
        // {
        //   "$lookup": {
        //     "from": "users",
        //     "localField": "author_ids",
        //     "foreignField": "_id",
        //     "as": "authors",

        //   }
        // }
      ]);

      if (!users) throw new Error("User not found");
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else res.status(400).json({ success: false });
}
