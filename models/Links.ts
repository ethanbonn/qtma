import mongoose, { Schema, model, Types } from "mongoose";
import type { Link } from "../types/models";


const schema = new Schema<Link>(
  {
    _id : {type : String, required : false},
    site: { type: String, required: false },
    url: { type: String, required: false },
    colour : {type: String, required : false},
  },
  { strict: false }
);
// Create and export the model.
export default mongoose.models.Link ?? model<Link>("Link", schema);

//
// new Schema<Link>(
//   {
//     site: { type: String, required: false },
//     url: { type: String, required: false },
//     colour : {type: String, required : false},
//   },
//   { strict: false }
// ),
