

export type Link = {
  _id?: string;
  site?: string;
  url?: string;
  colour? : string
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
  projectIds?: string[];
  skills?: Skill[];
};

// export type Chat = {
//   _id: string;
//   user: String; // _id
//   chats: [
//     {
//       textsWith:String[];   // recipients
//       texts: [
//         {
//           text: String; // content
//           sender:  String; // _id
//           receiver: String[]; // recipients
//           date: Date;
//         },
//             ]
//     } 
//   ]; 
// };


// export type Conversation = {
//   _id: string;
//   participants_id: string[];
//   conversation_type: string;
//   last_activity: Date;
//   message_ids: string[];
// };
// export type Message = {
//   _id: string;
//   conversation_id: string; // is this nessasary
//   time_created: Date;
//   sender_id: string;
//   content: string;
// };

export type Skill = {
  _id: string;
  name: string;
  colour: string;
  followers: string[]; // ids
  project_ids: string[];
};

export type Project = {
  _id: string;
  name: string;
  author_id: string;
  author_timezone: string;
  skills : Skill[];
  description: string;
  date_created: Date;
  desired_relationship_type: string;
  author_name?: string;
  author_title?: string;
  author_picture?: string; 
  // hours_per_week?: number;
  duration?: string;
  
};


