import { extend } from "umi-request";
import { login, getToken, setToken } from "@/utils/login";

const env = process.env.NODE_ENV;

const baseUrl = {
    test: "https://hbvivo.gzwindflag.com",
    development: "https://hbvivo.gzwindflag.com",
    // production: "http://hbvivo-api-test.gzwindflag.com",
    production: "https://hbvivo-api.gzwindflag.com",
};

export const request = extend({
    prefix: baseUrl[env],
    headers: {
        "Content-Type": "application/json",
        Token: getToken(),
    },
    requestType: "json",
    responseType: "json",
    parseResponse: true,
    errorHandler: async error => {
        if (error.response) {
            console.log("error.response:", error.response);

            if (error.response.status === 401) {
                setToken("");
                await login();
                // history.push("/");
                return;
            }

            // 请求已发送但服务端返回状态码非 2xx 的响应
            console.log(error?.data);
            console.log(error.request);
        } else {
            // 请求初始化时出错或者没有响应返回的异常
            console.error(error.message);
        }

        // 如果throw. 错误将继续抛出.
        // throw error;

        // 如果return, 则将值作为返回. 'return;' 相当于return undefined, 在处理结果时判断response是否有值即可.
        return;
    },
});

// request.interceptors.response.use(async response => {
//     const data = await response.clone().json();
//     if (data?.errcode) {
//         console.error(data);
//         return response.
//     }

//     return response;
// });

request.interceptors.request.use((url, options) => {
    options.headers = { ...options.headers, Token: getToken() };

    console.log("options.headers:", options.headers);

    return { url, options };
});
