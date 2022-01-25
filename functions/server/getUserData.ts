import type { User } from "../../types/models";
import baseUrl from "../../utils/baseUrl";

const getUserData = async (
  _id: string | null | undefined
): Promise<User | null> => {
  if (_id === null || _id === undefined) return null;
  const response = await fetch(`${baseUrl}/api/users/${_id}`);

  switch (response.status) {
    case 200:
      return (await response.json()).data as User;
    default:
      return null;
  }
};

export default getUserData;
