import mongoose, { Schema, model } from "mongoose";
import type { User, Link, Skill, Project } from "../types/models";
import SkillModel from "./Skills";

const projectSchema = require('../models/Projects');
const skillSchema = require('../models/Skills');
const linkSchema = require('../models/Links');

// Schema corresponding to the document interface.
const schema = new Schema<User>({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePicture: { type: String, required: false },
  jobTitle: { type: String, required: false },
  userDescription: { type: String, required: false },
  date_created: {type: Date, required: true},
  links: {
    type: [linkSchema.schema],
    default: [
      {
        site: "Linkedin",
        url: "",
        colour: "red",
      },
      {
        site: "GitHub",
        url: "",
        colour: "blue",
      },
      {
        site: "Website",
        url: "",
        colour: "green",
      },
    ],
  },
  timezone: { type: String, required: true },
  project_ids: { type: [String], required: true },
  projects: {type: [projectSchema.schema], required: false},
  skills: { type: [skillSchema.schema], required: false },
  skill_ids: {type: [String], required: false},
});

// Create and export the model.
export default mongoose.models.User ?? model<User>("User", schema);
