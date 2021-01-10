/* eslint-disable @typescript-eslint/no-require-imports */
import background from "./background/background.png";
import fireworks from "./background/fireworks.png";
import headFull from "./background/head-full.png";
import logo from "./background/logo.png";

import fu from "./cards/fu.png";
import li from "./cards/li.png";
import qian from "./cards/qian.png";
import wan from "./cards/wan.png";
import yu from "./cards/yu.png";

import coupon from "./prize-with-border/coupon.png";
import earphone from "./prize-with-border/earphone.png";
import phone from "./prize-with-border/phone.png";
import redEnvelope from "./prize-with-border/red-envelope.png";
import set from "./prize-with-border/set.png";
import snacks from "./prize-with-border/snacks.png";
import tv from "./prize-with-border/tv.png";
import vCard from "./prize-with-border/v-card.png";
import watch from "./prize-with-border/watch.png";

import contentIndex from "./content-index.png";

export const common = {
    background,
    logo,
};

export const index = {
    content: contentIndex,
    giftBtn: require("./btn/gift.png"),
    ruleBtn: require("./btn/rule.png"),
};

export const rule = {
    fireworks,
    prize: { coupon, earphone, phone, redEnvelope, snacks, tv, watch },
};

export const my = {
    prize: { coupon, earphone, phone, redEnvelope, set, snacks, tv, watch },
    cards: [fu, yu, qian, wan, li],
};

export const choose = {
    head: headFull,
};

export const box = {
    head: headFull,
    module: {
        close: require("./box/close.png"),
        container: require("./box/container.png"),
        flash: require("./box/flash.png"),
        open: require("./box/open.png"),
        spotlight: require("./box/spotlight.png"),
    },
    prize: {
        coupon: require("./prize/coupon.png"),
        earphone: require("./prize/earphone.png"),
        phone: require("./prize/phone.png"),
        redEnvelope: require("./prize/red-envelope.png"),
        snacks: require("./prize/snacks.png"),
        tv: require("./prize/tv.png"),
        watch: require("./prize/watch.png"),
    },
};
