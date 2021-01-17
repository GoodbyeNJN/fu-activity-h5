import { Card as CardType } from "@/utils/constant";
import wxProxy from "@/utils/wx-proxy";
import { ApiCardCollection } from "@/api";

type CardList = CardType[];

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
    const list = window.localStorage.getItem(openedCardKey) ?? "[]";
    return JSON.parse(list);
};

export const setOpenedCardList = (list: boolean[]) => {
    window.localStorage.setItem(openedCardKey, JSON.stringify(list));
};

export const share = async (callback: () => void) => {
    const url = new URL(window.location.href);
    url.search = "";

    const title = "vivo 福遇千万礼";
    const desc = "快来参加vivo 福遇千万礼活动";
    const link = url.toString();
    const imgUrl = "";

    const shareToTimeLine = new Promise(resolve => {
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

    const shareToFriends = new Promise(resolve => {
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

    await Promise.allSettled([shareToTimeLine, shareToFriends]);
    return true;
};

export const shareLink = () => {
    const url = new URL(window.location.href);
    url.search = "";

    const title = "vivo 福遇千万礼";
    const desc = "快来参加vivo 福遇千万礼活动";
    const link = url.toString();
    const imgUrl = "";

    // const { title, desc, imgUrl, link } = data;
    // let title = "刘昊然“拍了拍你”:快来挑战最佳合拍 vivo S7大奖等你拿";
    // let imgUrl = "http://qesxg0t0v.bkt.clouddn.com/WechatIMG97.png";
    wxProxy.updateAppMessageShareData({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: () => {
            // 设置成功
        },
    });
    wxProxy.updateTimelineShareData({
        title, // 分享标题
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: () => {
            // 设置成功
        },
    });
};

export const getCardList = (cardList: ApiCardCollection): CardList => {
    const { wufu, ...restCard } = cardList;
    if (wufu) {
        return [];
    }

    const list: CardList = [];
    Object.entries(restCard).forEach(([key, value]) => {
        if (value) {
            list.push(key as CardType);
        }
    });

    return list;
};

export default {
    isIos,
    isSafari,
    getArea,
    setArea,
    getOpenedCardList,
    setOpenedCardList,
    share,
    getCardList,
};
