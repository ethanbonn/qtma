import ProjectModel from "../../../models/Projects";
import dbConnect from "../../../utils/dbConnect";

export default async function search(query: string) {
    await dbConnect;
    try {
      const queryobj = await ProjectModel.aggregate([{
        "$search": {
            "index": "project search",
            "text": {
                "query": query,
                "path": {
                  "wildcard": "*"
                }
            }
        }
      }]);
      if (!queryobj) throw new Error("Data not found");
      console.log("Search index query: ", queryobj);
      return queryobj;
    } catch (error) {
      console.log(error);
    }
    return undefined;
}