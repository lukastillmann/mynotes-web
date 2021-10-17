import URI from "urijs";

const request = (method, url, body) => {
    const uri = new URI(url || "").addQuery("_o", document.location.hostname);
    if (method.toLowerCase() === "get" && body !== undefined && body !== null) {
        uri.addQuery(body).toString();
        body = null;
    }
    return new Promise((resolve, reject) => {
        fetch(uri.toString(), {
            redirect: "follow",
            method: method.toLowerCase(),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body !== null && body !== undefined ? JSON.stringify(body) : undefined,
        })
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject({
                        status: response.status,
                        message: response.statusText,
                    });
                }

                if (response.status === 200) {
                    let contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        resolve(response.json());
                    } else {
                        resolve();
                    }
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default {
    get: (url, body) => request("get", url, body),
    post: (url, body) => request("post", url, body),
};
