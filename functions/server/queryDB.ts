import type { Project } from "../../types/models";

export type supported_timezones = "ACST" | "AEST" | "AKST" | "AST" | "AWST" | "CET" | "CST" | "EET" | "EST" | "MST" | "PST" | "WET";

const queryDB = async (relationship?: "sponsor" | "collaborator", tags?: [string], skills?: [string], timezone?: [supported_timezones]): Promise<Project[] | null> => {

    type queryParams = {
        author_timezone: supported_timezones | supported_timezones[] | undefined;
        desired_relationship_type: "sponsor" | "collaborator" | undefined;
        project_tags: string | string[] | undefined;
        skill_id: string | string[] | undefined;
    };
    
    var params: queryParams = {
        author_timezone: timezone,
        desired_relationship_type: relationship,
        project_tags: tags,
        skill_id: skills
    };

    console.log(params);

    var valid_params: Array<String | String[]> = [];

    Object.keys(params).forEach(key => {
        if (params[key] !== undefined) {
            valid_params.push(key + "=" + params[key]);
        }
    });

    var query_string = valid_params !== undefined ? valid_params.join("&") : "";

    if (query_string === "") query_string = "query";

    await fetch(`http://localhost:3000/api/projects/${query_string}`)
        .then((response) => response.json())
        .then((projects) => {
            console.log(projects.data);
            return projects.data;
        });

    return null;
};

export default queryDB;