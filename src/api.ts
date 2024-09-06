import { Octokit } from "octokit";
import AggregateError from "aggregate-error";
import * as dotenv from "dotenv";
dotenv.config();
const env: NodeJS.ProcessEnv = process.env;

const fetchPackageInfo = async (
  packageType: string,
  packageName: string,
  org: string
): Promise<JSON> => {
  const octokit = new Octokit({ auth: env.GITHUB_TOKEN });
  try {
    const response = await octokit.request(
      `/orgs/{org}/packages/{package_type}/{package_name}`,
      {
        package_type: packageType,
        package_name: packageName,
        org: org,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    console.log("Package info fetched successfully");
    return response.data as JSON;
  } catch (error) {
    if (error instanceof AggregateError) {
      for (const individualError of error.errors) {
        console.error(individualError);
      }
    } else {
      console.error("Error fetching package info:", error);
    }
    throw error;
  }
};

fetchPackageInfo("container", "hello_docker", "microsoft").then((data) => {
  console.log(data);
});

export { fetchPackageInfo };
