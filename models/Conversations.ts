import type { Conversation } from "../types/models";
import mongoose, { Schema, model } from "mongoose";

// Schema corresponding to the document interface.
const schema = new Schema<Conversation>({
  _id: { type: String, required: true },
  participants_id : {type: [String], required: true},
  conversation_type: {type: String, required : true},
  last_activity: {type: Date, required: true},
  message_ids : {type: [String], required: true},

});

// Create and export the model.
export default mongoose.models.Conversation ?? model<Conversation>("Conversation", schema);
