import api from "@/api";
// import { getSdk } from "../request/api";

let cbList = [];
let loaded = false;
let firstEntry = true;

function isWeChat() {
    return window.navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1;
}

const wxProxy = new Proxyer(wx, function (target, name) {
    if (!isWeChat()) {
        return function () {
            console.warn("当前不是微信环境 跳过jsbill配置 该操作不执行:" + name);
        };
    } else if (loaded && name in target) {
        return target[name];
    } else {
        return function (...arg) {
            loadWx(() => target[name](...arg)).catch(err => console.log(err));
        };
    }
});

async function loadWx(callback = () => {}) {
    if (!isWeChat()) {
        console.warn("loadWx: 当前不是微信环境 跳过jsbill请求");
        return true;
    }
    if (!firstEntry) {
        cbList.push(callback);
    } else {
        firstEntry = false;
        let res = await api.getSignature({
            // url: encodeURIComponent("https://hbvivo.gzwindflag.com"),
            url: window.location.href.split("#")[0],
            // debug: true,
            // url: encodeURIComponent(window.location.href.split("#")[0]),
        });
        const { appId, nonceStr, signature, timestamp, debug } = res.data;
        wx.config({
            debug: false,
            appId,
            timestamp,
            nonceStr,
            signature,
            jsApiList: [
                "checkJsApi",
                "openLocation",
                "getLocation",
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "hideMenuItems",
                "uploadImage",
                "chooseImage",
                "scanQRCode",
                "chooseWXPay",
                "updateAppMessageShareData",
                "updateTimelineShareData",
                "closeWindow",
                "hideMenuItems",
                "showMenuItems",
                "hideAllNonBaseMenuItem",
                "showAllNonBaseMenuItem",
                "openAddress",
                "miniProgram",
            ],
        });
        await new Promise((resolve, reject) => {
            wx.ready(() => resolve());
            wx.error(err => resolve(err));
        });
        loaded = true;
        callback();
        if (cbList.length) {
            cbList.forEach(cb => cb());
            cbList = [];
        }
    }
    return true;
}

function Proxyer(obj, getter) {
    this.target = obj;
    let _this = this;
    for (let name in obj) {
        if (typeof _this.target[name] === "function") {
            _this[name] = (function (name) {
                return function () {
                    let f = getter(_this.target, name);
                    return f.apply(_this.target, arguments);
                };
            })(name);
        } else {
            Object.defineProperty(_this, name, {
                get: function () {
                    return getter(_this.target, name);
                },
            });
        }
    }
}

export default wxProxy;
