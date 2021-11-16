import type { Project } from "../../types/models";

type supported_timezones = "ACST" | "AEST" | "AKST" | "AST" | "AWST" | "CET" | "CST" | "EET" | "EST" | "MST" | "PST" | "WET";

const queryDB = async (relationship?: "sponsor" | "collaborator", tags?: [string], skills?: [string], timezone?: supported_timezones): Promise<Project[] | null> => {

    relationship = "sponsor";
    timezone = "EST";

    var queryParams = {desired_relationship_type: relationship, author_timezone: timezone}

    await fetch(`http://localhost:3000/api/projects/query`)
        .then((response) => response.json())
        .then((projects) => {
            console.log(projects.data)
            return projects;
        });

    return null;
};

export default queryDB;
