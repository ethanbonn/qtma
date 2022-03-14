import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "../../../../types/models";
import dbConnect from "../../../../utils/dbConnect";
import UserModel from "../../../../models/User";

import ProductModel from "../../../../models/Projects";

// the search is expensive and broad
// once enough data is in the db we'll need to change the query logic

type Data = {
  success: boolean;
  data?: User[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const {
  //   method,
  //   query
  // } = req;
  const { method } = req;
  const { query } = req;

  // Retrieve the search parameters from the URL
  const searchParams = new URLSearchParams(query.query as string);

  // Type guard for the URl query parameters
  type UserQuery = {
    userDescription: string | null | undefined;
    search: string | null | undefined;
    skills: string[] | null | undefined;
  };

  let allParams: UserQuery; // : {[key : string] : string[]};
  const searchObj = {};
  const skillsArr = [];
  let queryString = "";

  if (searchParams.get("query") === null) {
    // Set the value of an object to the provided URL query parameters
    allParams = {
      userDescription: searchParams.get("userDescription"),
      search: searchParams.get("search"),
      skills: searchParams.get("skills")?.split(","),
    };
    if (allParams.search && allParams.search !== "") {
      searchObj.should = [
        {
          text: {
            query: allParams.search,
            path: ["name", "description"],
          },
        },
      ];
      queryString = allParams.search;
    }

    if (allParams.userDescription) {
      searchObj.filter = [
        {
          text: {
            query: allParams.userDescription,
            path: "userDescription",
          },
        },
      ];
    }

    if (allParams.skills) {
      allParams.skills.forEach((x) => skillsArr.push({ name: x }));
    }
  } else allParams = {};

  /// /////////////////////////////////////////////
  /// ///////////////////////////

  if (method === "GET") {
    await dbConnect();
    // if search_string

    console.log("all user", allParams, queryString);
    try {
      let queryObj = [];
      let result;
      if (Object.keys(searchObj).length > 0) {
        queryObj = await UserModel.aggregate([
          {
            $search: {
              compound: searchObj,
            },
          },
          {
            $lookup: {
              from: "skills",
              localField: "skill_ids",
              foreignField: "_id",
              as: "skills",
            },
          },
        ]);
      }
      if (skillsArr.length > 0) {
        const querySkills = await UserModel.aggregate([
          {
            $lookup: {
              from: "skills",
              localField: "skill_ids",
              foreignField: "_id",
              as: "skills",
            },
          },
          // {
          //   $match: {
          //     skills: {
          //       $elemMatch: {
          //         $or: skillsArr,
          //       },
          //     },
          //   },
          // },
        ]);

        console.log("querySkills user", querySkills, skillsArr);

        // merge jsons and remove duplicates
        // won't change result if queryObj have values
        result = queryObj
          .concat(querySkills)
          .filter(
            (obj, pos, arr) =>
              arr.map((mapObj) => mapObj.name).indexOf(obj.name) === pos
          );
      } else result = queryObj;

      if (skillsArr.length === 0 && Object.keys(searchObj).length === 0) {
        // var result = await UserModel.find({});
        result = await UserModel.aggregate([
          {
            $sort: { date_created: -1 }, // sort the data
          },
          {
            $limit: 6,
          },
          {
            $lookup: {
              from: "skills",
              localField: "skill_ids",
              foreignField: "_id",
              as: "skills",
            },
          },
        ]);
      }

      if (queryString) {
        result = await UserModel.find({
          $or: [
            {
              userName: {
                $regex: queryString,
                $options: "i",
              },
            },
            {
              firstName: {
                $regex: queryString,
                $options: "i",
              },
            },
            {
              lastName: {
                $regex: queryString,
                $options: "i",
              },
            },
            {},
          ],
        });
      }
      console.log(result);
      if (!result) throw new Error("Data not found");
      // console.log("data queried", result);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  }
}
