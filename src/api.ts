import { Octokit } from "@octokit/core";
import * as dotenv from "dotenv";
dotenv.config();
const env: NodeJS.ProcessEnv = process.env;

const fetchPackageInfo = async (
  packageType: string,
  packageName: string,
  userName: string = env.GITHUB_USERNAME as string
): Promise<JSON> => {
  const octokit = new Octokit({ auth: env.GITHUB_TOKEN });
  try {
    const response = await octokit.request(
      `/user/{username}/packages/{package_type}/{package_name}`,
      {
        package_type: packageType,
        package_name: packageName,
        username: userName,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    console.log("Package info fetched successfully");
    return response.data as JSON;
  } catch (error) {
    console.error("Error fetching package info:", error);
    throw error;
  }
};

const packageInfo: Promise<void | JSON> = fetchPackageInfo(
  "npm",
  "hello-world-npm"
).then((data) => {
  console.log(data);
});
console.log(packageInfo);
export { fetchPackageInfo };
