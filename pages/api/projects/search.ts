import mongoose, { Schema, model } from "mongoose";
import ProjectModel from "../../../models/Projects";

export default async function search(query: string) {
  const rel_type = "sponsor";
  const skills = ["coding", "oop", "python"];
  // skills.map((name) => [])
    try {
      const queryobj = await ProjectModel.aggregate([{
        "$search": {
          "compound": {
            "should": [
              {
                text: {
                  query: 'mobile website',
                  path: ['name', 'description']
                }
              },
            ],
            "must": [
              {
                text: {
                  query: ['coding', 'python'],
                  path: 'skills'
                }
              }
            ],
            "filter": [
              {
                "text": {
                  "query": "sponsor",
                  "path": "desired_relationship_type" 
                }
              }
            ]
          }
        
        }
      }//,
      // {
      //   "$match": {
      //     "skills": {
      //       "$elemMatch": {
      //         "$or": [
      //           {"name": "coding"},
      //           {"name": "python"},
      //           {"name": "oop"}
      //         ]
      //       }
      //     }
      //   }
      // }
    ]);
      if (!queryobj) throw new Error("Data not found");
      console.log("Data not found Search index query: ", queryobj);
      return queryobj;
    } catch (error) {
      console.log(error);
    }
    return [];
    
}