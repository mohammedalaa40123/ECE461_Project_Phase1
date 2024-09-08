import { Octokit } from "@octokit/core";
import * as dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const env: NodeJS.ProcessEnv = process.env;

const NPM_REGISTRY_URL = "https://registry.npmjs.org/-/v1/search?text=$";
abstract class API {
  protected package_name: string;
  constructor(name: string) {
    this.package_name = name;
  }
  public abstract getData(): any;
}

export class GitHub extends API {
  private owner_name: string;
  constructor(p_name: string, own_name: string) {
    super(p_name);
    this.owner_name = own_name;
  }
  public override async getData(): Promise<void | JSON> {
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
      return response.data as unknown as JSON;
    } catch (error) {
      console.error("Error fetching package info:", error);
      throw error;
    }
  }
}

export class NPM extends API {
  constructor(p_name: string) {
    super(p_name);
  }
  public override async getData(): Promise<void | JSON> {
    try {
      const response = await axios.get(
        `${NPM_REGISTRY_URL}/${this.package_name}`
      );
      console.log("Package info fetched successfully");
      return response.data as unknown as JSON;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`Error fetching package info: ${error.message}`);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }
}

const npm = new NPM("express");
console.log(npm.getData());
