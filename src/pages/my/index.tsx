import React, { useEffect, useState } from "react";
import { useRequest, history } from "umi";
import { Toast } from "antd-mobile";
import classnames from "classnames";
import styles from "./styles.less";

import { card, prizeBorder, popup } from "@/assets/imgs";
import { AllPrize, Card, Cards, cards } from "@/utils/constant";
import Loading from "@/components/loading";
import Button from "@/components/button";
import Popup from "@/components/popup";

import api from "@/api";
import { login } from "@/utils/login";

type Prize = AllPrize | "bag";

const { opened } = card;

const My = () => {
    useEffect(() => {
        login();
    }, []);

    const [prizes, setPrizes] = useState<Prize[]>([]);
    const [cardList, setCardList] = useState<Cards>(cards);
    const [showVCard, setShowVCard] = useState(false);

    const { data, error, loading } = useRequest(api.getUserPrize);

    useEffect(() => {
        if (!data) {
            return;
        }

        const { lottery, card_collection } = data;
        if (lottery) {
            setPrizes(prev => {
                const newState = [...prev];
                newState.push(lottery.prize.prize_id);

                return newState;
            });
        }
        if (card_collection) {
            const { wufu, ...rest } = card_collection;

            setCardList(rest);
        }
    }, [data]);

    if (error) {
        Toast.fail(error.message);
    }
    if (loading) {
        return <Loading fullScreen />;
    }

    const PrizeElement = ({ value }: { value: Prize }) => {
        const isDisable = !prizes.includes(value);

        return (
            <img
                src={prizeBorder[value]}
                className={classnames(isDisable && styles.disable)}
                onClick={() => {
                    if (isDisable) {
                        return;
                    }

                    if (data?.lottery?.status) {
                        Toast.success(
                            <div>
                                您已兑换该奖品！
                                <br />
                                奖品会根据您填写的信息寄出，详情参考活动规则
                            </div>,
                        );
                        return;
                    }

                    if (value === "koi") {
                        setShowVCard(true);
                        return;
                    }

                    history.push({
                        pathname: "/form",
                        query: { from: value === "bag" ? "bag" : "prize" },
                    });
                }}
            />
        );
    };

    const CardElement = ({ value }: { value: Card }) => {
        const isDisable = !cardList[value];

        return (
            <img
                src={opened[value]}
                className={classnames(isDisable && styles.disable)}
                onClick={() => {
                    !isDisable && history.push("/card");
                }}
            />
        );
    };

    return (
        <div className={styles.container}>
            {showVCard && (
                <div className={styles.vCardPopup}>
                    <div className={styles.popupTitle}>2021年2月11日12点开奖</div>
                    <Popup src={popup.vCard} className={styles.popup} show={showVCard} noBtn />
                    <Button
                        className={styles.popupBtn}
                        onClick={() => {
                            setShowVCard(false);
                            history.push({
                                pathname: "/form",
                                query: { from: "prize" },
                            });
                        }}
                    >
                        确认
                    </Button>
                </div>
            )}

            <div className={styles.gifts}>
                <div className={styles.title}>我的奖品</div>

                <div className={styles.giftsList}>
                    <div className={styles.giftsListLine}>
                        <PrizeElement value="tv" />
                        <PrizeElement value="coupon" />
                        <PrizeElement value="phone" />
                    </div>
                    <div className={styles.giftsListLine}>
                        <PrizeElement value="watch" />
                        <PrizeElement value="earphone" />
                        <PrizeElement value="snacks" />
                    </div>
                    <div className={styles.giftsListLine}>
                        <PrizeElement value="redEnvelope" />
                        <PrizeElement value="bag" />
                        <PrizeElement value="koi" />
                    </div>
                </div>
            </div>
            <div className={styles.cards}>
                <div className={styles.title}>我的福卡</div>

                <div className={styles.cardsList}>
                    <CardElement value="fu" />
                    <CardElement value="yu" />
                    <CardElement value="qian" />
                    <CardElement value="wan" />
                    <CardElement value="li" />
                </div>
            </div>
        </div>
    );
};

export default My;
