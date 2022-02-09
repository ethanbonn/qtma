import type { Project, Skill, User, Link } from "../types/models";
import UserModel from "../models/User";
import Mongoose, { Schema, model, ObjectId } from "mongoose";


const skillSchema = new Schema<Skill>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  followers: {type: [String], required: false},
  project_ids: { type: [String], required: false },
});

const userSchema = new Schema<User>({
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


// Schema corresponding to the document interface.
const schema = new Schema<Project>({
  _id: { type: String, required: true },
  name: {type: String, required: true},
  author_ids: {type: [String], required: true},
  author_timezone: {type: String, required: true},
  skills : {type: [skillSchema], required: false},
  description: {type: String, required: true},
  date_created: {type: Date, required: true},
  author_name: {type: String, required: true},
  author_picture: {type: String, required: false},
  author_title: {type: String, required: true},
  author_username: {type: String, required: true},
  desired_relationship_type: {type: String, required: true},
  duration: {type: String, required: false},   // short (<1 month) | medium (1-4 months) | long (4+ months)
  authors: {type: [userSchema], required: false}

});

// Create and export the model.
export default Mongoose.models?.Project ?? model<Project>("Project", schema);
