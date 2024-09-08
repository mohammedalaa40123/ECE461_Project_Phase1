import * as fs from "fs";
import { GitHub, NPM } from "./api.js";

export class URLFileCommand {
  public static async run(file: string): Promise<void> {
    console.log(`Processing URL file: ${file}`);
    fs.readFile(file, "utf8", async (err, data) => {
      if (err) {
        console.error(`Error reading ${file}:`, err);
        process.exit(1);
        return;
      }

      const urls = data.split("\n").filter((url) => url.trim() !== "");

      for (const url of urls) {
        if (url.includes("github.com")) {
          console.log(`GitHub package: ${url}`);
          const [owner, repo] = url.split("github.com/")[1].split("/");
          const githubRepo = new GitHub(repo, owner);
          const data = await githubRepo.getData();
          console.log("GitHub Data:", data);
        } else if (url.includes("npmjs.com")) {
          console.log(`npm package: ${url}`);
          const packageName = url.split("package/")[1];
          const npmPackage = new NPM(packageName);
          const data = await npmPackage.getData();
          console.log("NPM Data:");
          const npmData = data as any;
          npmData.objects.forEach((obj: any) => {
            console.log(`Package Name: ${obj.package.name}`);
            console.log(`Version: ${obj.package.version}`);
            console.log(`Description: ${obj.package.description}`);
            console.log(`Score: ${obj.score.final}`);
            console.log("-----------------------------");
          });
        } else {
          console.log(`Unknown package source: ${url}`);
        }
      }
    });
  }
}
