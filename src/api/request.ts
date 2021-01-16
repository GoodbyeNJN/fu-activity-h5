import { extend } from "umi-request";
import { getToken } from "@/utils/login";

export const request = extend({
    headers: {
        "Content-Type": "application/json",
        Token: getToken(),
    },
    requestType: "json",
    responseType: "json",
    parseResponse: true,
    errorHandler: error => {
        if (error.response) {
            // 请求已发送但服务端返回状态码非 2xx 的响应
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log(error.data);
            console.log(error.request);
        } else {
            // 请求初始化时出错或者没有响应返回的异常
            console.log(error.message);
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
