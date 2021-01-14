import { IConfigFromPlugins } from "@@/core/pluginConfig";

const routes: IConfigFromPlugins["routes"] = [
    {
        path: "/",
        component: "index",
    },
];

export default routes;
