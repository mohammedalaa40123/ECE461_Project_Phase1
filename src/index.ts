import fetchRepo from "./api.js";

interface Repo {
  full_name: string;
  git_url: string;
}

fetchRepo("RezaSh798", "adder-ts").then((data: void | JSON) => {
  if (data) {
    const data_obj = data as unknown as Repo;
    const data_info: Repo = {
      full_name: data_obj.full_name,
      git_url: data_obj.git_url,
    };
    console.log(data_info);
  }
});
