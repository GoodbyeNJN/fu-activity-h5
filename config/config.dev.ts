import { defineConfig } from "umi";

export default defineConfig({
    proxy: {
        "/wechat/login": {
            // target: "http://hbvivo-api.gzwindflag.com",
            target: "http://hbvivo-api-test.gzwindflag.com",
            changeOrigin: true,
        },
        "/wechat/jssdk/signature": {
            // target: "http://hbvivo-api.gzwindflag.com",
            target: "http://hbvivo-api-test.gzwindflag.com",
            changeOrigin: true,
        },
        "/2021spring": {
            // target: "http://hbvivo-api.gzwindflag.com",
            target: "http://hbvivo-api-test.gzwindflag.com",
            changeOrigin: true,
        },
    },
    devServer: {
        https: true,
        port: 443,
    },
});
