import mongoose, { Schema, model } from "mongoose";
import type { Skill } from "../types/models";

// Schema corresponding to the document interface.
const schema = new Schema<Skill>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  followers: { type: [String], required: false},
  project_ids: { type: [String], required: false },
});

// Create and export the model.
export default mongoose.models.Skill ?? model<Skill>("Skill", schema);
