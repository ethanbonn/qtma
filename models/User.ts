import mongoose, { Schema, model } from "mongoose";
import type { User, Link } from "../types/models";

// Schema corresponding to the document interface.
const schema = new Schema<User>({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePicture: { type: String, required: false },
  jobTitle: { type: String, required: false },
  userDescription: { type: String, required: false },
  links: {
    type: [
      new Schema<Link>(
        {
          site: { type: String, required: false },
          url: { type: String, required: false },
        },
        { strict: false }
      ),
    ],
    default: [
      {
        site: "Linkedin",
        url: "",
      },
      {
        site: "GitHub",
        url: "",
      },
      {
        site: "Website",
        url: "",
      },
    ],
  },
  interests: { type: [String], required: false },
  timezone: { type: String, required: true },
  skillIdList: { type: [String], required: false },
  projectIds: { type: [String], required: false },
});

// Create and export the model.
export default mongoose.models.User ?? model<User>("User", schema);
