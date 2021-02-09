export default {
    // "POST /2021spring/lottery": {
    // errcode: 0,
    // message: "ok",
    // data: {
    //     prize: {
    //         prize_id: "lv1",
    //         name: "红包",
    //     },
    // },
    // },
    // "POST /2021spring/fucard/start": {
    //     errcode: 0,
    //     message: "ok",
    //     data: {
    //         card_collection: { wufu: 0, fu: 0, yu: 1, qian: 0, wan: 1, li: 1 },
    //     },
    // },
    "/2021spring/user/prize": {
        errcode: 0,
        message: "ok",
        data: {
            lottery: {
                prize: { prize_id: "v", name: "v" },
                status: 1, // 领奖状态，0 为未提交领奖信息（即未领奖），1 已领奖
                is_redpack: true, // 是否是红包，如果是红包且未确认（领奖），可换 V 卡
                redpack_status: 0, // 红包发送状态，0 为未发送
            },
            card_collection: { wufu: 0, fu: 0, yu: 1, qian: 0, wan: 1, li: 1 },
        },
    },
};
