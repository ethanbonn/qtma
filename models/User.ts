import mongoose, { Schema, model, Types } from "mongoose";
import type { User } from "../types/models";


const schema = new Schema<User>({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePicture: { type: String, required: false },
  jobTitle: { type: String, required: false },
  userDescription: { type: String, required: false },
  links: { type: {website : String, linkedin : String, github : String, other : String}, required: false },
  timezone: { type: String, required: true },
  project_ids: { type: [Schema.Types.ObjectID], required: false },
  skills: {type: {name : Schema.Types.ObjectID}, required : false},
});

// Create and export the model.
export default mongoose.models.User ?? model<User>("User", schema);
