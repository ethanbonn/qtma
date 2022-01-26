import type { Project } from "../../types/models";
import baseUrl from "../../utils/baseUrl";

const getProjectByUID = async (
  uid: string | null | undefined
): Promise<Project[] | null> => {
  if (uid === null || uid === undefined) return null;
  const response = await fetch(`${baseUrl}/api/projects/uid=${uid}`);

  switch (response.status) {
    case 200:
      return (await response.json()).data as Project[];
    default:
      return null;
  }
};

export default getProjectByUID;
