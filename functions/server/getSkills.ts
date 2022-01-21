import type { Skill } from "../../types/models";
import baseUrl from "../../utils/baseUrl";

// only use this for retreiving all skills
const getSkills = async (): Promise< null | Skill[]> => {
  const response = await fetch(`${baseUrl}/api/skill/all`);

  switch (response.status) {
    case 200:
      return (await response.json()).data;
    default:
      return null;
  }
};

export default getSkills;