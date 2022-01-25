export type UnregisteredUser = {
  email: string;
  _id: string;  // mongo id
  emailVerified?: boolean;
  id?: string;  // firebase id
};
