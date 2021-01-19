import { history } from "umi";

export const appid = "wxdf2b45713a6dde6d";

export const globalData: any = {};

export type Icon = "a" | "b" | "c" | "d" | "e";
export type Icons = Record<Card, Icon>;
export const icons: Icons = { fu: "a", yu: "b", qian: "c", wan: "d", li: "e" };

export type Card = "fu" | "yu" | "qian" | "wan" | "li";
export type Cards = Record<Card, number>;
export const cards: Cards = { fu: 0, yu: 0, qian: 0, wan: 0, li: 0 };

export type AllPrize =
    | "coupon"
    | "earphone"
    | "koi" // 锦鲤奖，全家桶
    | "phone"
    | "redEnvelope"
    | "snacks"
    | "tv"
    | "watch";

export type AllApiPrizeId =
    | "spec_tv"
    | "spec_coupon"
    | "lv1"
    | "lv2"
    | "lv3"
    | "lv4"
    | "redpack"
    | "v";

export type PrizeWithoutKoi = Exclude<AllPrize, "koi">;
export type ApiPrizeIdWithoutV = Exclude<AllApiPrizeId, "v">;

export type AllApiPrizeMap = Record<AllApiPrizeId, AllPrize>;
export type ApiPrizeMapWithoutKoi = Record<ApiPrizeIdWithoutV, PrizeWithoutKoi>;

export const allApiPrizeMap: AllApiPrizeMap = {
    spec_tv: "tv",
    spec_coupon: "coupon",
    lv1: "phone",
    lv2: "watch",
    lv3: "earphone",
    lv4: "snacks",
    redpack: "redEnvelope",
    v: "koi",
};

export const apiPrizeMapWithoutKoi: ApiPrizeMapWithoutKoi = {
    spec_tv: "tv",
    spec_coupon: "coupon",
    lv1: "phone",
    lv2: "watch",
    lv3: "earphone",
    lv4: "snacks",
    redpack: "redEnvelope",
};

export type PrizeInfo = Record<PrizeWithoutKoi, { level: string; name: string }>;

export const prizeInfoMap: PrizeInfo = {
    coupon: {
        level: "特等奖",
        name: "2021元以旧换新券",
    },
    earphone: {
        level: "三等奖",
        name: "vivo TWS Neo真无线耳机",
    },
    phone: {
        level: "一等奖",
        name: "X60手机",
    },
    redEnvelope: {
        level: "五等奖",
        name: "6.6元红包",
    },
    snacks: {
        level: "四等奖",
        name: "良品铺子年货礼盒",
    },
    tv: {
        level: "特等奖",
        name: "液晶电视",
    },
    watch: {
        level: "二等奖",
        name: "vivo WATCH智能手表",
    },
};

export type CardInfo = Record<Card, { link: string }>;

export const cardInfoMap = {
    fu: { link: "https://v.didi.cn/Ep1Jg6" },
    yu: {
        link: "https://shop240167.youzan.com/wscump/coupon/fetch?alias=32wtvggc&shopAutoEnter=1",
    },
    qian: { link: "https://tb.ele.me/wow/zele/act/wuhantongyonghongbao?wh_biz=tm" },
    wan: { link: "https://syoung.yujiahui.com/redeem/mobile?id=3116424334483584" },
    li: {
        link:
            "https://mofang.zhaopin.com/m/c-campaign?campaignId=13110&pageId=14498&bizId=13110&bizType=0",
    },
};

export const areaList = [
    { value: "宜昌", label: "宜昌" },
    { value: "孝感", label: "孝感" },
    { value: "襄阳", label: "襄阳" },
    { value: "咸宁", label: "咸宁" },
    { value: "武汉", label: "武汉" },
    { value: "随州广水", label: "随州广水" },
    { value: "十堰", label: "十堰" },
    { value: "荆州", label: "荆州" },
    { value: "荆门", label: "荆门" },
    { value: "江汉（天门、潜江、仙桃）", label: "江汉(天门、潜江、仙桃)" },
    { value: "黄石鄂州", label: "黄石鄂州" },
    { value: "黄冈", label: "黄冈" },
    { value: "恩施", label: "恩施" },
];

export const apiCodeHandler = {
    30002: () => history.push("/my"),

    30004: () => history.push("my"),

    30006: () => history.push("my"),
};

export default {
    globalData,
    appid,
    cards,
    allApiPrizeMap,
    apiPrizeMapWithoutKoi,
    prizeInfoMap,
    cardInfoMap,
    areaList,
    apiCodeHandler,
};
