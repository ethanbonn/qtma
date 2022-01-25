import type { User } from "../../types/models";
import baseUrl from "../../utils/baseUrl";

const getUserByUsername = async (
  userName: string | null | undefined
): Promise<User | null> => {
  if (userName === null || userName === undefined) return null;
  const response = await fetch(`${baseUrl}/api/profile/${userName}`);

  switch (response.status) {
    case 200:
      return (await response.json()).data as User;
    default:
      return null;
  }
};

export default getUserByUsername;
