import close from "./box/close.png";
import container from "./box/container.png";
import flash from "./box/flash.png";
import open from "./box/open.png";
import spotlight from "./box/spotlight.png";

import closeBtn from "./btn/close.png";
import giftBtn from "./btn/gift.png";
import ruleBtn from "./btn/rule.png";

import background from "./common/background.png";
import fireworks from "./common/fireworks.png";
import headFull from "./common/head-full.png";
import headLess from "./common/head-less.png";
import inputBorder from "./common/input-border.png";
import logo from "./common/logo.png";
import popup from "./common/popup.png";

import fuFlipped from "./flipped-cards/fu.png";
import liFlipped from "./flipped-cards/li.png";
import qianFlipped from "./flipped-cards/qian.png";
import wanFlipped from "./flipped-cards/wan.png";
import yuFlipped from "./flipped-cards/yu.png";

import share from "./popup/share.png";
import vCard from "./popup/v-card.png";

import coupon from "./prize/coupon.png";
import earphone from "./prize/earphone.png";
import phone from "./prize/phone.png";
import redEnvelope from "./prize/red-envelope.png";
import snacks from "./prize/snacks.png";
import tv from "./prize/tv.png";
import watch from "./prize/watch.png";

import couponBorder from "./prize-with-border/coupon.png";
import earphoneBorder from "./prize-with-border/earphone.png";
import phoneBorder from "./prize-with-border/phone.png";
import redEnvelopeBorder from "./prize-with-border/red-envelope.png";
import setBorder from "./prize-with-border/set.png";
import snacksBorder from "./prize-with-border/snacks.png";
import tvBorder from "./prize-with-border/tv.png";
import vCardBorder from "./prize-with-border/v-card.png";
import watchBorder from "./prize-with-border/watch.png";

import badge0 from "./small-cards/badge-0.png";
import badge1 from "./small-cards/badge-1.png";
import fuSmall from "./small-cards/fu.png";
import liSmall from "./small-cards/li.png";
import qianSmall from "./small-cards/qian.png";
import wanSmall from "./small-cards/wan.png";
import yuSmall from "./small-cards/yu.png";

import a from "./unflipped-cards/a.png";
import b from "./unflipped-cards/b.png";
import c from "./unflipped-cards/c.png";
import d from "./unflipped-cards/d.png";
import e from "./unflipped-cards/e.png";

import contentIndex from "./content-index.png";

export const common = { background, fireworks, headFull, headLess, inputBorder, logo, popup };

export const btn = {
    close: closeBtn,
    gift: giftBtn,
    rule: ruleBtn,
};

export const index = {
    content: contentIndex,
};

export const rule = {
    prize: {
        coupon: couponBorder,
        earphone: earphoneBorder,
        phone: phoneBorder,
        redEnvelope: redEnvelopeBorder,
        set: setBorder,
        snacks: snacksBorder,
        tv: tvBorder,
        vCard: vCardBorder,
        watch: watchBorder,
    },
};

export const my = {
    prize: {
        coupon: couponBorder,
        earphone: earphoneBorder,
        phone: phoneBorder,
        redEnvelope: redEnvelopeBorder,
        set: setBorder,
        snacks: snacksBorder,
        tv: tvBorder,
        vCard: vCardBorder,
        watch: watchBorder,
    },
    cards: {
        fu: fuSmall,
        yu: yuSmall,
        qian: qianSmall,
        wan: wanSmall,
        li: liSmall,
    },
};

export const choose = {
    head: headFull,
};

export const box = {
    head: headFull,
    popup: vCard,
    module: { close, container, flash, open, spotlight },
    prize: { coupon, earphone, phone, redEnvelope, snacks, tv, watch },
};

export const card = {
    head: headLess,
    smallCards: {
        badge0,
        badge1,
        fu: fuSmall,
        yu: yuSmall,
        qian: qianSmall,
        wan: wanSmall,
        li: liSmall,
    },
    flippedCards: {
        fu: fuFlipped,
        li: liFlipped,
        qian: qianFlipped,
        wan: wanFlipped,
        yu: yuFlipped,
    },
    unflippedCards: { a, b, c, d, e },
};
