import { defineConfig } from "umi";

export default defineConfig({
    nodeModulesTransform: {
        type: "none",
    },
    cssLoader: {
        localsConvention: "camelCaseOnly",
    },
    antd: {},
});
