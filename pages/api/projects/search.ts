import mongoose, { Schema, model } from "mongoose";
import ProjectModel from "../../../models/Projects";

export default async function search(query: string) {
  const rel_type = "sponsor";
  const skills = ["coding", "oop", "python"];
  // skills.map((name) => [])
    try {
      const queryobj = await ProjectModel.aggregate([{
        "$search": {
            "compound" : {
              "filter" : [{
                "text": {
                  "query" : rel_type,
                  "path" : "desired_relationship_type"
                }
              }] // ,
              // "should" : [
            //     {
            //         "text": {
            //             "query": "coding",
            //             "path": "skills.name"
            //         }
            //     },
            //     {
            //       "text": {
            //           "query": "oop",
            //           "path": "skills.name"
            //       }
            //   },
            //   {
            //     "text": {
            //         "query": "python",
            //         "path": "skills.name"
            //     }
            // },
            // {
              
            //   "text": {
            //         "query": query,
            //         "path": ["name", "description"]
            // }
            // }
              // ]
            }

        }
      }]);
      if (!queryobj) throw new Error("Data not found");
      console.log("Search index query: ", queryobj);
      return queryobj;
    } catch (error) {
      console.log(error);
    }
    return [];
    
}