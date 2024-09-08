var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Octokit } from "@octokit/core";
import * as dotenv from "dotenv";
dotenv.config();
const env = process.env;
export default function fetchPackageInfo(owner, repo) {
    return __awaiter(this, void 0, void 0, function* () {
        const octokit = new Octokit({ auth: env.GITHUB_TOKEN });
        try {
            const response = yield octokit.request("GET /repos/{owner}/{repo}", {
                owner: owner,
                repo: repo,
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
    });
}
