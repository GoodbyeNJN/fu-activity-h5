import { Toast } from "antd-mobile";
import { common } from "@/assets/imgs";
import { Cards } from "@/utils/constant";
import api from "@/api";

export interface Coords {
    longitude: number; // 经度，浮点数，范围为180 ~ -180
    latitude: number; // 纬度，浮点数，范围为90 ~ -90
}

const areaKey = "vivo-area";
const openedCardKey = "vivo-card";

export const isIos = () => {
    const userAgent = (navigator?.userAgent ?? "").toLowerCase();
    const isIpod = /ipod.+?os (\d+)/.test(userAgent);
    const isIpad = /ipad.+?os (\d+)/.test(userAgent);
    const isIphone = /iphone(?:.+?os (\d+))?/.test(userAgent) && !isIpad;
    return isIpod || isIpad || isIphone;
};

export const isSafari = () => {
    const userAgent = (navigator?.userAgent ?? "").toLowerCase();
    const isSafari = /version\/(\d+).+?safari/.test(userAgent);
    return isSafari;
};

export const getArea = () => {
    const area = window.localStorage.getItem(areaKey) ?? "";
    return area;
};

export const setArea = (area: string) => {
    window.localStorage.setItem(areaKey, area);
};

export const getOpenedCardList = () => {
    const list =
        window.sessionStorage.getItem(openedCardKey) ?? '{"fu":0,"yu":0,"qian":0,"wan":0,"li":0}';
    return JSON.parse(list);
};

export const setOpenedCardList = (list: Cards) => {
    window.sessionStorage.setItem(openedCardKey, JSON.stringify(list));
};

export const wxInit = async (apiList?: string[]) => {
    try {
        const res = await api.getSignature();
        if (res?.errcode) {
            throw res;
        }

        const { data } = res;
        // eslint-disable-next-line no-undef
        wx.config({
            debug: data.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            jsApiList: apiList ?? [
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "getLocation",
                "openLocation",
            ], // 必填，需要使用的JS接口列表
        });

        const promise = new Promise(resolve => {
            // eslint-disable-next-line no-undef
            wx.ready(() => {
                resolve(null);
            });
        });

        await promise;
    } catch (error) {
        Toast.fail(error?.message ?? "微信签名异常，请刷新重试");
    }
};

export const share = async (callback: () => void) => {
    // await wxInit();

    const url = new URL(window.location.href);
    url.search = "";

    const title = "vivo湖北福遇千万礼";
    const desc = "快来参加vivo湖北福遇千万礼活动";
    const link = url.toString();
    const imgUrl = `./static/${common.share}`;

    const shareToTimeLine = new Promise(resolve => {
        // eslint-disable-next-line no-undef
        wx.ready(() => {
            // eslint-disable-next-line no-undef
            wx.onMenuShareTimeline({
                title, // 分享标题
                link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl, // 分享图标
                success: () => {
                    // 用户点击了分享后执行的回调函数
                    callback();
                    return resolve(null);
                },
            });
        });
    });

    const shareToFriends = new Promise(resolve => {
        // eslint-disable-next-line no-undef
        wx.ready(() => {
            // eslint-disable-next-line no-undef
            wx.onMenuShareAppMessage({
                title, // 分享标题
                desc, // 分享描述
                link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl, // 分享图标
                // type: "", // 分享类型,music、video或link，不填默认为link
                // dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                success: () => {
                    // 用户点击了分享后执行的回调函数
                    callback();
                    return resolve(null);
                },
            });
        });
    });

    await Promise.allSettled([shareToTimeLine, shareToFriends]);
    return true;
};

// export const shareLink = () => {
//     const url = new URL(window.location.href);
//     url.search = "";

//     const title = "vivo 福遇千万礼";
//     const desc = "快来参加vivo 福遇千万礼活动";
//     const link = url.toString();
//     const imgUrl = "";

//     // const { title, desc, imgUrl, link } = data;
//     // let title = "刘昊然“拍了拍你”:快来挑战最佳合拍 vivo S7大奖等你拿";
//     // let imgUrl = "http://qesxg0t0v.bkt.clouddn.com/WechatIMG97.png";
//     wxProxy.updateAppMessageShareData({
//         title, // 分享标题
//         desc, // 分享描述
//         link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//         imgUrl, // 分享图标
//         success: () => {
//             // 设置成功
//         },
//     });
//     wxProxy.updateTimelineShareData({
//         title, // 分享标题
//         link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//         imgUrl, // 分享图标
//         success: () => {
//             // 设置成功
//         },
//     });
// };

export const getLocation = async () => {
    // await wxInit();

    const promise = new Promise<Coords>(resolve => {
        // eslint-disable-next-line no-undef
        wx.ready(() => {
            // eslint-disable-next-line no-undef
            wx.getLocation({
                type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: (res: {
                    latitude: number; // 纬度，浮点数，范围为90 ~ -90
                    longitude: number; // 经度，浮点数，范围为180 ~ -180
                }) =>
                    resolve({
                        latitude: res.latitude,
                        longitude: res.longitude,
                    }),
            });
        });
    });

    try {
        const res = await promise;
        return res;
    } catch (error) {
        Toast.fail(error?.message ?? "无法获取定位，请授予定位权限");
    }
};

export const navigateToLocation = async (coords: Coords, name: string, address: string) => {
    // await wxInit();

    // eslint-disable-next-line no-undef
    wx.ready(() => {
        // eslint-disable-next-line no-undef
        wx.openLocation({
            longitude: coords.longitude, // 经度，浮点数，范围为180 ~ -180。
            latitude: coords.latitude, // 纬度，浮点数，范围为90 ~ -90
            name, // 位置名
            address, // 地址详情说明
            scale: 10, // 地图缩放级别,整形值,范围从1~28。默认为最大
        });
    });
};

const getRad = (deg: string | number) => {
    const degNumber = typeof deg === "string" ? parseFloat(deg) : deg;
    return (degNumber * Math.PI) / 180;
};

export const getDistance = (coords1: Coords, coords2: Coords) => {
    const lon1 = getRad(coords1.longitude);
    const lat1 = getRad(coords1.latitude);

    const lon2 = getRad(coords2.longitude);
    const lat2 = getRad(coords2.latitude);

    const r = 6371;
    const cos = Math.cos;
    const sin = Math.sin;
    const acos = Math.acos;

    const distance = r * acos(cos(lat1) * cos(lat2) * cos(lon1 - lon2) + sin(lat1) * sin(lat2));

    return distance;
};

export default {
    isIos,
    isSafari,
    getArea,
    setArea,
    getOpenedCardList,
    setOpenedCardList,
    wxInit,
    share,
    getLocation,
    navigateToLocation,
    getDistance,
};
