import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "../../../types/models";
import dbConnect from "../../../utils/dbConnect";
import UserModel from "../../../models/User";
import SkillsModel from "../../../models/Skills";

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
    query: { _id },
  } = req;

  if (method === "GET") {
    await dbConnect();

    try {
      if (typeof _id !== "string") throw new Error("Invalid _id");
      const user = await UserModel.aggregate([
        {
           "$match": { "_id": { "$eq": _id } } 
        },
        { $limit: 1 },
        {
          $lookup: {
            from: "skills",
            localField: "skill_ids",
            foreignField: "_id",
            as: "skills",
          },
        },
      ]);
      // const user = await UserModel.findById(_id);
      // var skills = [];
      // console.log(user.skill_ids);
      // for (var i = 0; i < user.skill_ids.length; i++){
      //   var skill = await SkillsModel.findById(user.skill_ids[i]);
      //   skills.push(skill);
      // }
      // user.skills = skills;
      if (!user) throw new Error("User not found");
      // res.status(200).json({ success: true, data: user?.toObject() });
      res.status(200).json({ success: true, data: user[0]});

    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else res.status(400).json({ success: false });
}
