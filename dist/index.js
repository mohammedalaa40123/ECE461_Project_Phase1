import fetchRepo from "./api.js";
fetchRepo("RezaSh798", "adder-ts").then((data) => {
    if (data) {
        const data_obj = data;
        const data_info = {
            full_name: data_obj.full_name,
            git_url: data_obj.git_url,
        };
        console.log(data_info);
    }
});
