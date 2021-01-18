import boxBorder from "./box/border.png";
import boxClose from "./box/close.png";
import boxFlash from "./box/flash.png";
import boxOpen from "./box/open.png";
import boxSpotlight from "./box/spotlight.png";

import backgroundBtn from "./btn/background.png";
import closeBtn from "./btn/close.png";
import giftBtn from "./btn/gift.png";
import ruleBtn from "./btn/rule.png";

import background from "./common/background.png";
import flash from "./common/flash.png";
import inputBorder from "./common/input-border.png";
import logo from "./common/logo.png";
import pattern from "./common/pattern.png";
import navIcon from "./common/nav.png";
import phoneIcon from "./common/phone.png";
import share from "./common/share.jpg";

import a from "./covered-card/a.png";
import b from "./covered-card/b.png";
import c from "./covered-card/c.png";
import d from "./covered-card/d.png";
import e from "./covered-card/e.png";
import arrow from "./covered-card/arrow.png";
import border from "./covered-card/border.png";
import coveredCard from "./covered-card/card.png";

import bigFireworks from "./fireworks/big.png";
import smallFireworks from "./fireworks/small.png";

import branchIndex from "./index/branch.png";
import content from "./index/content.png";
import patternIndex from "./index/pattern.png";
import phoneIndex from "./index/phone.png";
import phonePendant from "./index/phone-pendant.png";
import redEnvelopeIndex from "./index/red-envelope.png";
import redEnvelopePendant from "./index/red-envelope-pendant.png";
import wordIndex from "./index/word.png";

import fu from "./opened-card/fu.png";
import yu from "./opened-card/yu.png";
import qian from "./opened-card/qian.png";
import wan from "./opened-card/wan.png";
import li from "./opened-card/li.png";
import bag from "./opened-card/bag.png";
import openedCard from "./opened-card/card.png";

import longPopup from "./popup/long.png";
import shortPopup from "./popup/short.png";
import sharePopup from "./popup/share.png";
import redEnvelopePopup from "./popup/red-envelope.png";
import vCardPopup from "./popup/v-card.png";

import coupon1 from "./prize/coupon-1.png";
import coupon2 from "./prize/coupon-2.png";
import earphone from "./prize/earphone.png";
import koi from "./prize/koi.png";
import phone from "./prize/phone.png";
import redEnvelope from "./prize/red-envelope.png";
import snacks from "./prize/snacks.png";
import tv from "./prize/tv.png";
import watch from "./prize/watch.png";

import bagBorder from "./prize-border/bag.png";
import couponBorder from "./prize-border/coupon.png";
import earphoneBorder from "./prize-border/earphone.png";
import koiBorder from "./prize-border/koi.png";
import phoneBorder from "./prize-border/phone.png";
import redEnvelopeBorder from "./prize-border/red-envelope.png";
import snacksBorder from "./prize-border/snacks.png";
import tvBorder from "./prize-border/tv.png";
import watchBorder from "./prize-border/watch.png";

import fuWord from "./red-card/fu.png";
import yuWord from "./red-card/yu.png";
import qianWord from "./red-card/qian.png";
import wanWord from "./red-card/wan.png";
import liWord from "./red-card/li.png";
import badge0 from "./red-card/badge-0.png";
import badge1 from "./red-card/badge-1.png";
import redCard from "./red-card/red-card.png";

export const common = {
    background,
    flash,
    inputBorder,
    logo,
    pattern,
    navIcon,
    phoneIcon,
    share,
};

export const fireworks = {
    big: bigFireworks,
    small: smallFireworks,
};

export const btn = {
    background: backgroundBtn,
    close: closeBtn,
    gift: giftBtn,
    rule: ruleBtn,
};

export const popup = {
    long: longPopup,
    short: shortPopup,
    share: sharePopup,
    redEnvelope: redEnvelopePopup,
    vCard: vCardPopup,
};

export const box = {
    border: boxBorder,
    close: boxClose,
    flash: boxFlash,
    open: boxOpen,
    spotlight: boxSpotlight,
};

export const card = {
    border,

    covered: {
        a,
        b,
        c,
        d,
        e,
        arrow,
        background: coveredCard,
    },

    opened: {
        fu,
        yu,
        qian,
        wan,
        li,
        bag,
        background: openedCard,
    },

    red: {
        fu: fuWord,
        yu: yuWord,
        qian: qianWord,
        wan: wanWord,
        li: liWord,
        badge: [badge0, badge1],
        background: redCard,
    },
};

export const prize = {
    coupon1,
    coupon2,
    earphone,
    koi,
    phone,
    redEnvelope,
    snacks,
    tv,
    watch,
};

export const prizeBorder = {
    bag: bagBorder,
    coupon: couponBorder,
    earphone: earphoneBorder,
    koi: koiBorder,
    phone: phoneBorder,
    redEnvelope: redEnvelopeBorder,
    snacks: snacksBorder,
    tv: tvBorder,
    watch: watchBorder,
};

export const index = {
    branch: branchIndex,
    content,
    pattern: patternIndex,
    phone: phoneIndex,
    phonePendant,
    redEnvelope: redEnvelopeIndex,
    redEnvelopePendant,
    word: wordIndex,
};
