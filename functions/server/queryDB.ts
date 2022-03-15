import type { Project } from "../../types/models";
import baseUrl from "../../utils/baseUrl";

export type supported_timezones =
  | "ACST"
  | "AEST"
  | "AKST"
  | "AST"
  | "AWST"
  | "CET"
  | "CST"
  | "EET"
  | "EST"
  | "MST"
  | "PST"
  | "WET";

const queryDB = async (
  relationship?: string,
  searchInput?: string,
  skillsInput?: string[] | [],
  timezone?: [supported_timezones]
): Promise<Project[]> => {
  // Type guard for the query parameters
  type queryParams = {
    // key: keyof typeof String;
    author_timezone: supported_timezones | supported_timezones[] | undefined;
    desired_relationship_type: string | undefined;
    search: string | undefined;
    skills: [] | string[] | undefined;
  };

  // Set the value of an object to the provided parameters to the function
  const params: queryParams = {
    author_timezone: timezone,
    desired_relationship_type: relationship,
    search: searchInput,
    skills: skillsInput,
  };

  // Create a separate array containing all valid parameters
  const projectParams: Array<String | String[]> = [];
  const profileParams = [];

  // // Map each parameter to the projectParams list if they are not undefined
  // Object.keys(params).forEach(key => {
  //     if (params[key as keyof queryParams] !== undefined && params[key as keyof queryParams] !== "" && params[key as keyof queryParams] !== []) {
  //         console.log("Skills", params[key as keyof queryParams], typeof(params[key as keyof queryParams]));
  //         projectParams.push(key + "=" + params[key as keyof queryParams]);
  //     }
  // });

  if (relationship) {
    projectParams.push(
      `desired_relationship_type=${params.desired_relationship_type}`
    );
  }

  if (searchInput) {
    projectParams.push(`search=${params.search}`);
    profileParams.push(`search=${params.search}`);
  }

  if (skillsInput && skillsInput.length !== 0) {
    projectParams.push(`skills=${params.skills}`);
    profileParams.push(`skills=${params.skills}`);
  }
  // If there are valid parameters, join them with &, otherwise, set the query string to query
  const projectQueryString =
    projectParams.length !== 0 ? projectParams.join("&") : "query";
  const profileQueryString =
    profileParams.length !== 0 ? profileParams.join("&") : "query";
  console.log(
    "BASE URL",
    baseUrl,
    `\n${projectQueryString}`,
    `\n${profileQueryString}`
  );

  const projects = await fetch(
    `${baseUrl}/api/projects/${projectQueryString}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((proj) => proj.data);
  console.log("projects:", projects);

  const users = await fetch(
    `${baseUrl}/api/users/search/${profileQueryString}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((user) => user.data);

  console.log("PROF SS", profileQueryString);
  console.log("RET", users);
  console.log("users: ", users);
  console.log("projs: ", projects);
  return [projects, users];
};

export default queryDB;
