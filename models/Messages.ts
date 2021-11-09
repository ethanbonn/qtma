import type { Message } from "../types/models";
import mongoose, { Schema, model } from "mongoose";

// Schema corresponding to the document interface.
const schema = new Schema<Message>({
  _id: { type: String, required: true },
  conversation_id : {type: String, required: true},
  time_created: {type: Date, required: true},
  sender_id : {type: String, required: true},
  content: {type: String, required: true},
});

// Create and export the model.
export default mongoose.models.Message ?? model<Message>("Message", schema);
