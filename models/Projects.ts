import type { Project, Skill, User, Link } from "../types/models";
import UserModel from "../models/User";
import Mongoose, { Schema, model, ObjectId } from "mongoose";

var userSchema = require('User');
var skillSchema = require('Skills');


// Schema corresponding to the document interface.
const schema = new Schema<Project>({
  _id: { type: String, required: true },
  name: {type: String, required: true},
  author_ids: {type: [String], required: true},
  // author_timezone: {type: String, required: true},
  skills : {type: [skillSchema.schema], required: false},
  description: {type: String, required: true},
  date_created: {type: Date, required: true},
  // author_name: {type: String, required: true},
  // author_picture: {type: String, required: false},
  // author_title: {type: String, required: true},
  // author_username: {type: String, required: true},
  desired_relationship_type: {type: String, required: true},
  duration: {type: String, required: false},   // short (<1 month) | medium (1-4 months) | long (4+ months)
  authors: {type: [userSchema.schema], required: false},
  skill_ids: { type: [String], required: false },
  active: {type: Boolean, required: false},


});

// Create and export the model.
export default Mongoose.models?.Project ?? model<Project>("Project", schema);
