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

  if (search_params.get("skill") !== null) {
    query_param = {
        "$search": {
            "autocomplete": {
                "query": search_params.get("skill"),
                "path": "name",
                "fuzzy": {
                    "maxEdits": 1,
                    "prefixLength": 1
                }
            }
        }
    }
  }
  else query_param = {};

  if (method === "GET") {

    await dbConnect();

    try {
      const queryobj = await SkillModel.find(query_param);
      if (!queryobj) throw new Error("Data not found");
      res.status(200).json({ success: true, data: queryobj });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else res.status(400).json({ success: false });
}
