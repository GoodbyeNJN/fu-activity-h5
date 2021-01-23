import { request } from "./request";
import { AllPrize, AllApiPrizeId, allApiPrizeMap } from "@/utils/constant";

interface Result<T = any> {
    errcode: number;
    message: string;
    data: T;
}

export interface ApiCardCollection {
    wufu: number;
    fu: number;
    yu: number;
    qian: number;
    wan: number;
    li: number;
}

export interface UserInfo {
    token: string;
    expire_in: number;
    user_info: { nickname: string; avatar: string };
}

export interface Signature {
    debug: boolean;
    openTagList: [];
    appId: "wxdf2b45713a6dde6d";
    nonceStr: string;
    timestamp: number;
    signature: string;
}

export interface Shop {
    area: string;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
    contact_phone: string;
}

export interface UserPrize {
    // 如果还没有抽奖，整个 lottery 节点是 NULL
    lottery: {
        prize: { prize_id: AllPrize; name: string };
        status: 0 | 1; // 领奖状态，0 为未提交领奖信息（即未领奖），1 已领奖
        is_redpack: boolean; // 是否是红包，如果是红包且未确认（领奖），可换 V 卡
        redpack_status: 0 | 1; // 红包发送状态，0 为未发送
    } | null;
    card_collection: ApiCardCollection;
}

export interface LotteryPrize {
    prize: {
        prize_id: AllPrize;
        name: string;
        coupon_id: string;
    };
}

export interface WinnerInfo {
    name: string;
    mobile: string;
    area: string;
    mobile_code: string;
    address: string;
}

export interface CardCollection {
    card_collection: ApiCardCollection;
}

export interface RedeemerInfo {
    name: string;
    mobile: string;
    area: string;
    shop_name: string;
    key: string;
}

export const login = (code: string) => {
    return request.post<Result<UserInfo>>("/wechat/login", { data: { code } });
};

export const getSignature = async (debug?: 0 | 1) => {
    try {
        const url = new URL(window.location.href);
        url.hash = "";

        const res = await request.post<Result<Signature>>("/wechat/jssdk/signature", {
            data: { url: url.toString(), debug: debug ?? 0 },
        });
        if (res?.errcode) {
            throw res;
        }

        return res;
    } catch (error) {
        throw new Error(error?.message ?? "获取微信签名异常，请刷新重试");
    }
};

export const getShopList = async () => {
    try {
        const res = await request.get<Result<Shop[]>>("/2021spring/shop/list");
        if (res?.errcode) {
            throw res;
        }

        return res;
    } catch (error) {
        throw new Error(error?.message ?? "获取门店异常，请刷新重试");
    }
};

export const getUserPrize = async () => {
    try {
        const res = await request.get<Result<UserPrize>>("/2021spring/user/prize");
        if (res?.errcode) {
            throw res;
        }

        if (res?.data.lottery) {
            const prizeId = res?.data.lottery.prize.prize_id as AllApiPrizeId;
            res.data.lottery.prize.prize_id = allApiPrizeMap[prizeId];
        }

        return res;
    } catch (error) {
        throw new Error(error?.message ?? "获取奖品异常，请刷新重试");
    }
};

export const getLotteryResult = async (area: string) => {
    try {
        const res = await request.post<Result<LotteryPrize>>("/2021spring/lottery", {
            data: { area },
        });
        if (res?.errcode) {
            throw res;
        }

        if (res?.data) {
            const prizeId = res?.data.prize.prize_id as AllApiPrizeId;
            res.data.prize.prize_id = allApiPrizeMap[prizeId];
        }

        return res;
    } catch (error) {
        throw new Error(error?.message ?? "抽奖异常，请刷新重试");
    }
};

export const acceptRedPack = async () => {
    try {
        const res = await request.post<Result<null>>("/2021spring/lottery/redpack");
        if (res?.errcode) {
            throw res;
        }

        return;
    } catch (error) {
        throw new Error(error?.message ?? "收取红包异常，请刷新重试");
    }
};

export const acceptVCard = async () => {
    try {
        const res = await request.post<Result<null>>("/2021spring/lottery/vcard");
        if (res?.errcode) {
            throw res;
        }

        return;
    } catch (error) {
        throw new Error(error?.message ?? "收取V卡异常，请刷新重试");
    }
};

export const submitWinnerInfo = async (data: WinnerInfo) => {
    try {
        const res = await request.post<Result<null>>("/2021spring/lottery/info/submit", { data });
        if (res?.errcode) {
            throw res;
        }

        return res;
    } catch (error) {
        throw new Error(error?.message ?? "提交信息异常，请刷新重试");
    }
};

export const getCardCollection = async () => {
    try {
        const res = await request.post<Result<CardCollection>>("/2021spring/fucard/start");
        if (res?.errcode) {
            throw res;
        }

        return res;
    } catch (error) {
        throw new Error(error?.message ?? "获取福卡异常，请刷新重试");
    }
};

export const getCardCollectionAfterShare = async () => {
    try {
        const res = await request.post<Result<CardCollection>>("/2021spring/fucard/share");
        if (res?.errcode) {
            throw res;
        }

        return res;
    } catch (error) {
        throw new Error(error?.message ?? "获取更多福卡异常，请刷新重试");
    }
};

export const syntheticCard = async (data: RedeemerInfo) => {
    try {
        const res = await request.post<Result<CardCollection>>("/2021spring/fucard/synthesize", {
            data,
        });
        if (res?.errcode) {
            throw res;
        }

        return res;
    } catch (error) {
        throw new Error(error?.message ?? "提交信息异常，请刷新重试");
    }
};

export default {
    login,
    getSignature,
    getShopList,
    getUserPrize,
    getLotteryResult,
    acceptRedPack,
    acceptVCard,
    submitWinnerInfo,
    getCardCollection,
    getCardCollectionAfterShare,
    syntheticCard,
};
