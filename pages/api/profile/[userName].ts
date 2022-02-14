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
  const {
    method,
    query: { userName },
  } = req;

  if (method === "GET") {
    await dbConnect();

    try {
      if (typeof userName !== "string") throw new Error("Invalid userName");
      // const user_alt = await UserModel.findOne({ userName });
      // console.log("ORIG", user_alt);
      const user = await UserModel.aggregate([
        { "$match": { "$expr": { "$eq": [ "$userName", userName ] } } },
        {
          "$lookup": {
            "from": "skills",
            "localField": "skill_ids",
            "foreignField": "_id",
            "as": "skills",

          }
        },
        {
          "$lookup":
          {
            "from": "projects",
            "let": { "project_ids": "$project_ids" },
            "pipeline": [
              { "$match": { "$expr": { "$in": [ "$_id", "$$project_ids"] } } },
              { "$lookup": {
                  "from": "users",
                  "let": { "author_ids": "$author_ids"},
                  "pipeline": [
                    { "$match": { "$expr": { "$in": [ "$_id", "$$author_ids" ] } } }
                  ],
                  "as": "authors"
                }
              },
              { "$lookup": {
                "from": "skills",
                "let": { "skill_ids": "$skill_ids"},
                "pipeline": [
                  { "$match": { "$expr": { "$in": [ "$_id", "$$skill_ids" ] } } }
                ],
                "as": "skills"
              }
            },
            ],
            "as": "projects"
          }
        },

      ]);

      // console.log("USER", user);
      console.log("RESPONSE", user);
      console.log('TYPE', typeof(user));
      console.log("BODY", user[0]);

      if (!user) throw new Error("User not found");
      res.status(200).json({ success: true, data: user[0] });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else res.status(400).json({ success: false });
}
