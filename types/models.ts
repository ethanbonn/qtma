export type Link = {
  _id: string;
  site?: string;
  url?: string;
};

export type User = {
  _id: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  jobTitle?: string;
  userDescription?: string;
  links?: Link[];
  interests?: string[];
  timezone: string;
  skillIdList?: string[];
  projectIds?: string[];
};

export type Conversation = {
  _id: string;
  participants_id: string[];
  conversation_type: string;
  last_activity: Date;
  message_ids: string[];
};
export type Message = {
  _id: string;
  conversation_id: string; // is this nessasary
  time_created: Date;
  sender_id: string;
  content: string;
};
export type Project = {
  _id: string;
  author_id: string;
  author_timezone: string;
  project_tags: string[];
  skill_id: string[];
  description: string;
  liked_by_ids: string[];
  date_created: Date;
  desired_relationship_type: string;
};

export type Skill = {
  _id: string;
  name: string;
  follower_ids: string[];
  project_ids: string[];
};

export type ProjectTag = {
  _id: string;
  name: string;
  project_ids: string[];
};
