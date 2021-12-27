import type { Project } from "../../types/models";

export type supported_timezones = "ACST" | "AEST" | "AKST" | "AST" | "AWST" | "CET" | "CST" | "EET" | "EST" | "MST" | "PST" | "WET";

const queryDB = async (relationship?: "sponsor" | "collaborator", tags?: [string], skills?: [string], timezone?: [supported_timezones]): Promise<Project[]> => {

    // Type guard for the query parameters
    type queryParams = {
        // key: keyof typeof String;
        author_timezone: supported_timezones | supported_timezones[] | undefined;
        desired_relationship_type: "sponsor" | "collaborator" | undefined;
        project_tags: string | string[] | undefined;
        skills: string | string[] | undefined;
    };

    // Set the value of an object to the provided parameters to the function
    var params: queryParams = {
        author_timezone: timezone,
        desired_relationship_type: relationship,
        project_tags: tags,
        skills: skills
    };

    // Create a separate array containing all valid parameters
    var valid_params: Array<String | String[]> = [];

    // Map each parameter to the valid_params list if they are not undefined
    Object.keys(params).forEach(key => {
        if (params[key as keyof queryParams] !== undefined && params[key as keyof queryParams] !== "") {
            valid_params.push(key + "=" + params[key as keyof queryParams]);
        }
    });

    // If there are valid parameters, join them with &, otherwise, set the query string to query
    var query_string = (valid_params.length !== 0) ? valid_params.join("&") : "query";

    // var projects =  await fetch(`http://localhost:3000/api/projects/${query_string}`, {
    var projects = await fetch(`http://localhost:3000/api/projects/${query_string}`, {
      method: 'GET'
    })
        .then((response) => response.json())
        .then((projects) => {
            return projects.data;
        });
    console.log("projects in Query: ", projects);
    return projects;


};

export default queryDB;
