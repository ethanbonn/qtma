import type { Chat } from "../types/models";

import mongoose, { Schema, model } from "mongoose";

const ChatSchema = new Schema({
  user: { type: String, ref: "User" }, // _id
  chats: [
    {
      textsWith: { type: [String], ref: "User" }, // recipients
      texts: [
        {
          text: { type: String, required: true }, // content
          sender: { type: String, ref: "User" }, // _id
          receiver: { type: [String], ref: "User" }, // recipients
          date: { type: Date },
        },
      ],
    },
  ],
});

export default mongoose.models.Chat ?? model<Chat>("User", ChatSchema);
