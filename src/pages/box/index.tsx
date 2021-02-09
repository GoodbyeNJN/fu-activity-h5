import { useEffect, useMemo, useState } from "react";
import { history, useRequest } from "umi";
import { Toast } from "antd-mobile";
import classnames from "classnames";
import styles, { bigBtnDisable } from "./styles.less";

import { common, fireworks, popup } from "@/assets/imgs";
import { PrizeWithoutKoi, prizeInfoMap } from "@/utils/constant";
import Button from "@/components/button";
import Boxes, { Prize } from "@/components/box";
import Popup from "@/components/popup";
import Loading from "@/components/loading";

import api from "@/api";
import { login } from "@/utils/login";
import { getArea } from "@/utils";

const Box = () => {
    useEffect(() => {
        login();
    }, []);

    const [btnDisabled, setBtnDisabled] = useState(false);

    const [isPoped, setIsPoped] = useState(false);
    const [showVCard, setShowVCard] = useState(false);

    const { run, data, error, loading } = useRequest(api.getLotteryResult, { manual: true });
    const vCardResultRequest = useRequest(api.getVCardResult, { manual: true });

    if (error || vCardResultRequest.error) {
        Toast.fail(error?.message || vCardResultRequest.error?.message);
    }

    const [prizeId, prizeKey] = useMemo<[PrizeWithoutKoi?, Prize?]>(() => {
        if (!data) {
            return [];
        }

        const prizeId = data.prize.prize_id;
        const couponId = data.prize.coupon_id;
        if (prizeId === "koi") {
            return [];
        }
        if (prizeId === "coupon") {
            if (String(couponId) === "4556353458") {
                return [prizeId, "coupon1"];
            } else if (String(couponId) === "8815551707") {
                return [prizeId, "coupon2"];
            }

            return [prizeId, "coupon1"];
        }
        if (prizeId === "redEnvelope") {
            setIsPoped(true);
        }

        return [prizeId, prizeId];
    }, [data]);

    const startLottery = async () => {
        const area = getArea();
        setBtnDisabled(true);
        await run(area);
        setBtnDisabled(false);
    };

    const acceptRedEnvelope = async () => {
        try {
            // await api.acceptRedPack();
            history.push({
                pathname: "/form",
                query: { from: "prize" },
            });
        } catch (error) {
            Toast.fail(error.message);
        }
    };

    const acceptVCard = async () => {
        try {
            await api.acceptVCard();
            setShowVCard(false);
            history.push({
                pathname: "/form",
                query: { from: "prize" },
            });
        } catch (error) {
            Toast.fail(error.message);
        }
    };

    const jumpToForm = () => {
        history.push({
            pathname: "/form",
            query: { from: "prize" },
        });
    };

    if (!prizeKey || !prizeId) {
        return (
            <div className={styles.container}>
                <img src={fireworks.big} className={styles.fireworks} />
                <img src={common.pattern} className={styles.head} />

                {loading && <Loading className={styles.loading} />}
                <Boxes className={styles.box} />

                <Button
                    className={classnames(styles.bigBtn, btnDisabled && styles.bigBtnDisable)}
                    onClick={() => !btnDisabled && startLottery()}
                >
                    打开福盒
                </Button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Popup src={popup.redEnvelope} show={isPoped} setShow={setIsPoped} />
            {showVCard && (
                <div className={styles.vCardPopup}>
                    {!vCardResultRequest.data ? null : typeof vCardResultRequest.data ===
                      "string" ? (
                        <div className={styles.popupTitle}> {vCardResultRequest.data}</div>
                    ) : (
                        <div className={styles.popupText}>
                            <div>{`恭喜${vCardResultRequest.data.name}顾客(手机尾号${vCardResultRequest.data.phone_suffix})获得超级锦鲤奖！`}</div>
                            <div>奖品将在年后寄出，届时请凭中奖短信至购机门店领取</div>
                        </div>
                    )}
                    <Popup src={popup.vCard} className={styles.popup} show={showVCard} noBtn />
                    <Button className={styles.popupBtn} onClick={acceptVCard}>
                        收下V卡
                    </Button>
                </div>
            )}

            <img src={fireworks.big} className={styles.fireworks} />
            <img src={common.pattern} className={styles.head} />

            <div className={styles.title}>
                <div className={styles.titlePrize}>{prizeInfoMap[prizeId].level}</div>
                <div className={styles.titleName}>{prizeInfoMap[prizeId].name}</div>
            </div>

            <Boxes className={styles.box} prize={prizeKey} />

            {prizeKey === "redEnvelope" ? (
                <>
                    <Button
                        className={classnames(styles.smallBtn, styles.smallBtnLeft)}
                        onClick={acceptRedEnvelope}
                    >
                        收下红包
                    </Button>
                    <Button
                        className={classnames(styles.smallBtn, styles.smallBtnRight)}
                        onClick={() => {
                            setShowVCard(true);
                            vCardResultRequest.run();
                        }}
                    >
                        兑换V卡
                    </Button>
                </>
            ) : (
                <Button className={styles.bigBtn} onClick={jumpToForm}>
                    立即收下
                </Button>
            )}
        </div>
    );
};

export default Box;
