import type { Skill } from "../types/models";
import mongoose, { Schema, model } from "mongoose";

// Schema corresponding to the document interface.
const schema = new Schema<Skill>({
  _id: { type: String, required: true },
  name: {type: String, required: true},
  follower_ids: {type: [String], required: true},
  project_ids: {type: [String], required: true},
});

// Create and export the model.
export default mongoose.models.Skill ?? model<Skill>("Skill", schema);
