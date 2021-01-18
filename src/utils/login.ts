import { appid } from "@/utils/constant";

import api from "@/api";

const tokenKey = "vivo-2021";

export const getWxCode = () => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (code && state === "logged") {
        url.searchParams.delete("code");
        url.searchParams.delete("state");
        window.history.pushState(null, "", url.toString());
        return code;
    }

    return "";
};

export const getToken = () => {
    const token = window.localStorage.getItem(tokenKey) ?? "";
    console.warn("get token:", token);
    return token;
};

export const setToken = (token: string) => {
    console.log("set token:", token);
    window.localStorage.setItem(tokenKey, token);
};

export const wxLogin = (state = "logged") => {
    const url = new URL(window.location.href);
    url.searchParams.delete("code");
    url.searchParams.delete("state");
    const redirectUri = encodeURIComponent(url.toString());

    const loginUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;

    window.location.href = loginUrl;
};

export const login = async () => {
    const code = getWxCode();
    const token = getToken();

    if (token) {
        return true;
    }

    if (!code) {
        return wxLogin();
    }

    try {
        const res = await api.login(code);
        if (res?.errcode) {
            throw res;
        }

        console.log("res.data.token:", res?.data.token);
        setToken(res?.data.token ?? "");
    } catch (error) {
        throw new Error(error?.message ?? "登录异常，请刷新重试");
    }
};
export default {
    getWxCode,
    getToken,
    setToken,
    wxLogin,
    login,
};
