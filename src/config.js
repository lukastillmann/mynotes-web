import URITemplate from "urijs/src/URITemplate";
const BASE_URL_API = process.env.VUE_APP_API_URL || "http://me.orf.at:3000";

const config = {
    api: {
        categories: BASE_URL_API + "/",
        notes: new URITemplate(BASE_URL_API + "/category/{category}"),
        note: new URITemplate(BASE_URL_API + "/category/{category}/{note}"),
        add: new URITemplate(BASE_URL_API + "/category/{category}/new"),
    },
};

export default config;
