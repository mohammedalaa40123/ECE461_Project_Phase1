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
const fetchPackageInfo = (packageType_1, packageName_1, ...args_1) => __awaiter(void 0, [packageType_1, packageName_1, ...args_1], void 0, function* (packageType, packageName, userName = env.GITHUB_USERNAME) {
    const octokit = new Octokit({ auth: env.GITHUB_TOKEN });
    try {
        const response = yield octokit.request(`/user/{username}/packages/{package_type}/{package_name}`, {
            package_type: packageType,
            package_name: packageName,
            username: userName,
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
const packageInfo = fetchPackageInfo("npm", "hello-world-npm").then((data) => {
    console.log(data);
});
console.log(packageInfo);
export { fetchPackageInfo };
