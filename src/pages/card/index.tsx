import { useEffect, useMemo, useState } from "react";
import { history, useRequest } from "umi";
import { Toast } from "antd-mobile";
import classnames from "classnames";
import styles from "./styles.less";

import { common, popup } from "@/assets/imgs";
import { Card as CardType, Cards as CardsType, cards } from "@/utils/constant";
import Button from "@/components/button";
import Cards from "@/components/card";
import RedCard from "@/components/red-card";
import Popup from "@/components/popup";
import Loading from "@/components/loading";

import api from "@/api";
import { getOpenedCardList, setOpenedCardList, share, wxInit } from "@/utils";
import { login } from "@/utils/login";

let count = 0;

const Card = () => {
    useEffect(() => {
        wxInit();
        login();
    }, []);

    const [cardList, setCardList] = useState<CardsType>(cards);
    const [openedList, setOpenedList] = useState<CardsType>(cards);
    const [show, setShow] = useState(false);

    const userPrize = useRequest(api.getUserPrize);
    const baseCard = useRequest(api.getCardCollection);
    const moreCard = useRequest(api.getCardCollectionAfterShare, { manual: true });

    const shouldShowPopup = useMemo(() => {
        const ownedCardNumber = Object.values(cardList).filter(value => value !== 0).length;
        const openedCardNumber = Object.values(openedList).filter(value => value !== 0).length;
        return ownedCardNumber === 3 && openedCardNumber === 3;
    }, [cardList, openedList]);

    const shouldButtonEnable = useMemo(() => {
        const ownedCardNumber = Object.values(cardList).filter(value => value !== 0).length;
        const openedCardNumber = Object.values(openedList).filter(value => value !== 0).length;
        return ownedCardNumber === 5 && openedCardNumber === 5;
    }, [cardList, openedList]);

    useEffect(() => {
        const list = getOpenedCardList();
        setOpenedList(list);
    }, []);

    useEffect(() => {
        setOpenedCardList(openedList);
    }, [openedList]);

    useEffect(() => {
        if (!userPrize.data) {
            return;
        }

        const { wufu, ...rest } = userPrize.data.card_collection;
        if (!wufu || !Object.values(rest).every(value => value === 0)) {
            setCardList(rest);
        }
    }, [userPrize.data]);

    useEffect(() => {
        if (!baseCard.data) {
            return;
        }

        if (Object.values(cardList).every(value => value === 0)) {
            const { wufu, ...rest } = baseCard.data.card_collection;
            setCardList(rest);
        }
    }, [baseCard.data, cardList]);

    useEffect(() => {
        if (!moreCard.data) {
            return;
        }

        const { wufu, ...rest } = moreCard.data.card_collection;
        setCardList(rest);
    }, [moreCard.data]);

    useEffect(() => {
        if (shouldShowPopup) {
            if (count < 1) {
                setShow(true);
                count += 1;
            }
        }
    }, [shouldShowPopup]);

    if (userPrize.error || baseCard.error || moreCard.error) {
        Toast.fail(baseCard.error?.message ?? moreCard.error?.message);
    }
    if (userPrize.loading || baseCard.loading) {
        return <Loading fullScreen />;
    }

    const onClick = () => {
        if (shouldShowPopup) {
            setShow(true);
            return;
        }

        if (shouldButtonEnable) {
            history.push({
                pathname: "/form",
                query: { from: "bag" },
            });
            return;
        }
    };

    const updateShow = (flag: boolean) => {
        if (!flag) {
            moreCard.run();
        }

        setShow(flag);
    };

    const RedCardElement = ({ value }: { value: CardType }) => (
        <RedCard className={styles.smallCard} word={value} number={openedList[value] ? 1 : 0} />
    );

    return (
        <div className={styles.container}>
            <Popup src={popup.share} show={show} setShow={updateShow} />

            <img src={common.pattern} className={styles.head} />

            <Cards
                className={styles.bigCard}
                cardList={cardList}
                setCardList={setCardList}
                openedList={openedList}
                setOpenedList={setOpenedList}
            />

            <div className={styles.smallCardList}>
                <RedCardElement value="fu" />
                <RedCardElement value="yu" />
                <RedCardElement value="qian" />
                <RedCardElement value="wan" />
                <RedCardElement value="li" />
            </div>

            <Button
                className={classnames(styles.btn, !shouldButtonEnable && styles.btnDisable)}
                onClick={onClick}
            >
                立即合成
            </Button>
        </div>
    );
};

export default Card;
