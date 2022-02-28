export type Link = {
  _id?: string;
  site?: string;
  url?: string;
  colour?: string;
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
  date_created: Date;
  timezone: string;
  project_ids: string[];
  projects?: [Project];
  skills?: Skill[];
  skill_ids?: string[];
};

export type Skill = {
  _id: string;
  name: string;
  followers: string[]; // ids
  project_ids: string[];
};

export type Project = {
  _id: string;
  name: string;
  author_ids: string[];
  skills? : Skill[];
  description: string;
  date_created: Date;
  desired_relationship_type: string;
  duration?: string;
  authors?: [User];
  skill_ids?: string[];
  active: boolean;
  
};
