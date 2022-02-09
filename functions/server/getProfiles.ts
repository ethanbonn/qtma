import type { User } from "../../types/models";
import baseUrl from "../../utils/baseUrl";

const getProfiles = async (
): Promise<User[] | null> => {
  const response = await fetch(`${baseUrl}/api/profile/landing`);

  switch (response.status) {
    case 200:
      return (await response.json()).data as User[];
    default:
      return null;
  }
};

export default getProfiles;
