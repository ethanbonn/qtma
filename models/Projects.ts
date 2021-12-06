import type { Project } from "../types/models";
import mongoose, { Schema, model } from "mongoose";

// Schema corresponding to the document interface.
const schema = new Schema<Project>({
  _id: { type: String, required: true },
  name: {type: String, required: true},
  author_id: {type: String, required: true},
  author_timezone: {type: String, required: true},
  project_tags: {type: [String], required: false},
  skill_id: {type: [String], required: false},
  description: {type: String, required: true},
  liked_by_ids: {type: [String], required: false},
  date_created: {type: Date, required: true},
  desired_relationship_type: {type: String, required: true}

});

// Create and export the model.
export default mongoose.models.Project ?? model<Project>("Project", schema);
