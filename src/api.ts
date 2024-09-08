import { Octokit } from "@octokit/core";
import * as dotenv from "dotenv";
dotenv.config();
const env: NodeJS.ProcessEnv = process.env;

export default async function fetchPackageInfo(
  owner: string,
  repo: string
): Promise<void | JSON> {
  const octokit = new Octokit({ auth: env.GITHUB_TOKEN });
  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}", {
      owner: owner,
      repo: repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    console.log("Package info fetched successfully");
    return response.data as unknown as JSON;
  } catch (error) {
    console.error("Error fetching package info:", error);
    throw error;
  }
}
