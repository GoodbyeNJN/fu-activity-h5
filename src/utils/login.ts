import api from "@/api";

const appid = "wxdf2b45713a6dde6d";
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
    return token;
};

export const setToken = (token: string) => {
    window.localStorage.setItem(tokenKey, token);
};

export const wxLogin = (state = "logged") => {
    const redirectUri = encodeURIComponent(window.location.href);

    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;

    window.location.href = url;
};

export const login = async () => {
    const code = getWxCode();
    const token = getToken();

    if (token) {
        return;
    }

    if (!code) {
        return wxLogin();
    }

    const res = await api.login(code);
    setToken(res?.data?.token ?? "");
};
export default {
    getWxCode,
    getToken,
    setToken,
    wxLogin,
    login,
};
