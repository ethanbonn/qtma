import type { Project, Skill } from "../types/models";
import mongoose, { Schema, model } from "mongoose";


const skillSchema = new Schema<Skill>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  colour: { type: String, required: true },
  users_possess: { type : [String], required: false},
  users_learning: { type: [String], required: false},
  project_ids: { type: [String], required: false },
});


// Schema corresponding to the document interface.
const schema = new Schema<Project>({
  _id: { type: String, required: true },
  name: {type: String, required: true},
  author_id: {type: String, required: true},
  author_timezone: {type: String, required: true},
  skills : {type: [skillSchema], required: false},
  description: {type: String, required: true},
  date_created: {type: Date, required: true},
  desired_relationship_type: {type: String, required: true},
  // hours_per_week: {type: Number, required: false}, 
  duration: {type: String, required: false}, // short (<1 month) | medium (1-4 months) | long (4+ months)  

});

// Create and export the model.
export default mongoose.models?.Project ?? model<Project>("Project", schema);
