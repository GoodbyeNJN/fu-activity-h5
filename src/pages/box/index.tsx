import { useMemo, useState } from "react";
import { history, useRequest } from "umi";
import classnames from "classnames";
import styles from "./styles.less";

import { common, btn, box } from "@/assets/images";
import Button from "@/components/button";
import Box from "@/components/box";

import api from "@/api";

type PrizeKey = "coupon" | "earphone" | "phone" | "redEnvelope" | "snacks" | "tv" | "watch";
type PrizeMap = {
    [k in PrizeKey]: {
        prize: string;
        name: string;
        src: string;
        className: PrizeKey;
    };
};

const { module, prize } = box;
const prizeMap: PrizeMap = {
    coupon: {
        prize: "特等奖",
        name: "2021元以旧换新券",
        src: prize.coupon,
        className: "coupon",
    },
    earphone: {
        prize: "三等奖",
        name: "vivo TWS Neo真无线耳机",
        src: prize.earphone,
        className: "earphone",
    },
    phone: {
        prize: "一等奖",
        name: "X60手机",
        src: prize.phone,
        className: "earphone",
    },
    redEnvelope: {
        prize: "五等奖",
        name: "6.6元红包",
        src: prize.redEnvelope,
        className: "redEnvelope",
    },
    snacks: {
        prize: "四等奖",
        name: "良品铺子年货礼盒",
        src: prize.snacks,
        className: "snacks",
    },
    tv: {
        prize: "特等奖",
        name: "液晶电视",
        src: prize.tv,
        className: "tv",
    },
    watch: {
        prize: "二等奖",
        name: "vivo WATCH智能手表",
        src: prize.watch,
        className: "watch",
    },
};

export default () => {
    const [isOpened, setIsOpened] = useState(false);
    const [isPoped, setIsPoped] = useState(false);

    const openBox = useRequest(() => api.openBox, { manual: true });

    const [isRedEnvelope, prizeKey] = useMemo<[boolean, PrizeKey?]>(() => {
        if (openBox.data && prizeMap[openBox.data]) {
            setIsOpened(true);

            if (openBox.data === "redEnvelope") {
                setIsPoped(true);

                return [true, openBox.data];
            } else {
                return [false, openBox.data];
            }
        } else {
            return [false];
        }
    }, [openBox.data]);

    const jumpToPage = (prizeKey: PrizeKey | "vCard") => {
        history.push({
            pathname: "/form",
            query: { prize: prizeKey },
        });
    };

    return (
        <div className={styles.container}>
            {isPoped && (
                <div className={styles.mask}>
                    <img src={box.popup} className={styles.popup} />
                    <img
                        src={btn.close}
                        className={styles.closeBtn}
                        onClick={() => setIsPoped(false)}
                    />
                </div>
            )}

            <img src={box.head} className={styles.head} />
            <img src={common.fireworks} className={styles.fireworks} />

            <Box className={styles.box} open={isOpened} />

            {isRedEnvelope ? (
                <>
                    <Button
                        className={classnames(styles.smallBtn, styles.smallBtnLeft)}
                        onClick={() => jumpToPage("redEnvelope")}
                    >
                        收下红包
                    </Button>
                    <Button
                        className={classnames(styles.smallBtn, styles.smallBtnRight)}
                        onClick={() => jumpToPage("vCard")}
                    >
                        兑换V卡
                    </Button>
                </>
            ) : isOpened && prizeKey ? (
                <Button className={styles.bigBtn} onClick={() => jumpToPage(prizeKey)}>
                    立即收下
                </Button>
            ) : (
                <Button className={styles.bigBtn} onClick={openBox.run}>
                    打开福盒
                </Button>
            )}
        </div>
    );
};
