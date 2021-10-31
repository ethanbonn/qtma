import type { AuthUser } from "next-firebase-auth";
import type { User } from "../../types/models";

const getUserData = async (id: string | null): Promise<User | null> => {
  if (id === null) return null;
  const response = await fetch(`http://localhost:3000/api/users/${id}`);

  switch (response.status) {
    case 200:
      return (await response.json()) as User;
    default:
      return null;
  }
};

export default getUserData;
