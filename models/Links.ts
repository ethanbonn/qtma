import mongoose, { Schema, model, Types } from "mongoose";
import type { Link } from "../types/models";


const schema = new Schema<Link>({
  _id: { type: String, required: true },
  website : {type: String, required : false},
  linkedin : {type: String, required : false},
  github : {type: String, required : false},
  other : {type : String, required : false},
});
// Create and export the model.
export default mongoose.models.Link ?? model<Link>("Link", schema);
