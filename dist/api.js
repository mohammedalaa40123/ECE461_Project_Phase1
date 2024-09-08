import { Octokit } from "@octokit/core";
import * as dotenv from "dotenv";
import axios from 'axios';
const NPM_REGISTRY_URL = 'https://registry.npmjs.org/-/v1/search?text=$';
dotenv.config();
const env = process.env;
export class API {
    package_name;
    constructor(name) {
        this.package_name = name;
    }
}
export class Git_Hub extends API {
    owner_name;
    constructor(p_name, own_name) {
        super(p_name);
        this.owner_name = own_name;
    }
    async getData() {
        const octokit = new Octokit({ auth: env.GITHUB_TOKEN });
        try {
            const response = await octokit.request("GET /repos/{owner}/{repo}", {
                owner: this.owner_name,
                repo: this.package_name,
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            });
            console.log("Package info fetched successfully");
            return response.data;
        }
        catch (error) {
            console.error("Error fetching package info:", error);
            throw error;
        }
    }
}
export class NPM extends API {
    constructor(p_name) {
        super(p_name);
    }
    async getData() {
        try {
            const response = await axios.get(`${NPM_REGISTRY_URL}/${this.package_name}`);
            console.log("Package info fetched successfully");
            return response.data;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(`Error fetching package info: ${error.message}`);
            }
            else {
                console.error('Unexpected error:', error);
            }
        }
    }
}
