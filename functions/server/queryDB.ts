import type { Project } from "../../types/models";

type supported_timezones = "ACST" | "AEST" | "AKST" | "AST" | "AWST" | "CET" | "CST" | "EET" | "EST" | "MST" | "PST" | "WET";

const queryDB = async (relationship?: "sponsor" | "collaborator", tags?: [string], skills?: [string], timezone?: [supported_timezones]): Promise<Project[] | null> => {

    relationship = "sponsor";
    timezone = ["EST", "PST"];

    var params = {relationship_type: relationship, timezone: timezone}

    if (tags) {
        params["tags"] = tags;
    }
    if (skills) {
        params["skills"] = skills;
    }

    var query_string = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    
    console.log(query_string);

    await fetch(`http://localhost:3000/api/projects/${query_string}`)
        .then((response) => response.json())
        .then((projects) => {
            return projects.data;
        });

    return null;
};

export default queryDB;
