import type { NextApiRequest, NextApiResponse } from "next";
import type { Skill } from "../../../types/models";
import dbConnect from "../../../utils/dbConnect";
import SkillModel from "../../../models/Skills";

type Data = {
  success: boolean;
  data?: Skill[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    method,
    query
  } = req;

  // Retrieve the search parameters from the URL
  let search_params = new URLSearchParams(query.query as string);
  var query_param;

  console.log("params", search_params);
  if (search_params.get("name") !== null) {
    console.log("query", search_params.get("name"));

    query_param = {
      $text:
        {
          $search: search_params.get("name"),
          $caseSensitive: false,
          $diacriticSensitive: false
        }
    }
  }
  else query_param = {};

  if (method === "GET") {

    await dbConnect();

    try {
      console.log(query_param);
      var queryobj;
      if (search_params.get("name") !== null) queryobj = await SkillModel.aggregate([query_param]);
      else queryobj = await SkillModel.find({});
      
      if (!queryobj) throw new Error("Data not found");
      res.status(200).json({ success: true, data: queryobj });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else res.status(400).json({ success: false });
}
