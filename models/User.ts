import mongoose, { Schema, model } from "mongoose";
import type { User, Link, Skill } from "../types/models";
import SkillModel from "./Skills";

const skillSchema = new Schema<Skill>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  colour: { type: String, required: true },
  followers: { type: [String], required: false },
  project_ids: { type: [String], required: false },
});

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
  links: {
    type: [
      new Schema<Link>(
        {
          _id: { type: String, required: false },
          site: { type: String, required: false },
          url: { type: String, required: false },
          colour: { type: String, required: false },
        },
        { strict: false }
      ),
    ],
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
  interests: { type: [String], required: false },
  timezone: { type: String, required: true },
  projectIds: { type: [String], required: false },
  skills: { type: [skillSchema], required: false },
});

// Create and export the model.
export default mongoose.models.User ?? model<User>("User", schema);
