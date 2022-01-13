import type { Skill } from "../../types/models";

// only use this for retreiving all skills
const getSkills = async (): Promise< null | Skill[]> => {
  const response = await fetch(`http://localhost:3000/api/skill/all`);

  switch (response.status) {
    case 200:
      return (await response.json()).data;
    default:
      return null;
  }
};

export default getSkills;