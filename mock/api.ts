export default {
    "POST /2021spring/lottery": {
        errcode: 0,
        message: "ok",
        data: {
            prize: {
                prize_id: "lv1",
                name: "红包",
            },
        },
    },

    "POST /2021spring/fucard/start": {
        errcode: 0,
        message: "ok",
        data: {
            card_collection: { wufu: 0, fu: 0, yu: 1, qian: 0, wan: 1, li: 1 },
        },
    },

    "/2021spring/user/prize": {
        errcode: 0,
        message: "ok",
        data: {
            lottery: null,
            card_collection: { wufu: 0, fu: 0, yu: 1, qian: 0, wan: 1, li: 1 },
        },
    },
};
