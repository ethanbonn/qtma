import { prop, getModelForClass } from "@typegoose/typegoose";
import * as mongoose from "mongoose";

/**
 *  - Email
 - User Name
 - Password
 - First Name
 - Last Name
 - Profile Pic (Link) -> maybe move to cdn later
Job Title
 - Professional Summary / User Description
 - Links: (Linkedin, github, portfolio website, other)
 - Skills
 - Interests
 */

class UserProfile {
  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true, unique: true })
  public userName!: string;

  @prop({ required: true })
  public password!: string;

  @prop()
  public profilePicture?: string;

  @prop()
  public description?: string;

  @prop({ type: [String] })
  public links?: string[];

  @prop({ type: [String] })
  public skills?: string[];

  @prop({ type: [String] })
  public interests?: string[];
}

const UserProfileModel = getModelForClass(UserProfile);
