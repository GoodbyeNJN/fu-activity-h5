import { request } from "./request";

interface Result<T = any> {
    errcode: number;
    message: string;
    data: T;
}

export interface UserInfo {
    token: string;
    expire_in: number;
    user_info: { nickname: string; avatar: string };
}

export const login = (code: string) => {
    return request.post<Result<UserInfo>>("/wechat/login", { data: { code } });
};

export interface Shop {
    area: string;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
}

export const getShopList = () => {
    return request.get<Result<Shop[]>>("/2021spring/shop/list");
};

export interface Prize {
    // 如果还没有抽奖，整个 lottery 节点是 NULL
    lottery: {
        prize: { prize_id: "redpack"; name: string };
        status: 0 | 1; // 领奖状态，0 为未提交领奖信息（即未领奖），1 已领奖
        is_redpack: boolean; // 是否是红包，如果是红包且未确认（领奖），可换 V 卡
        redpack_status: 0 | 1; // 红包发送状态，0 为未发送
    };
    card_collection: {
        wufu: number;
        fu: number;
        yu: number;
        qian: number;
        wan: number;
        li: number;
    };
}

export const getUserPrize = () => {
    return request.get<Result<Prize>>("/2021spring/user/prize");
};

export default {
    login,
    getShopList,
    getUserPrize,
};
