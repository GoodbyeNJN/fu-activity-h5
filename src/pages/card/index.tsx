import { useEffect, useState } from "react";
import { history, useRequest } from "umi";
import { Toast } from "antd-mobile";
import classnames from "classnames";
import styles from "./styles.less";

import { common, popup } from "@/assets/imgs";
import { Card as CardType, cards } from "@/utils/constant";
import Button from "@/components/button";
import Cards from "@/components/card";
import RedCard from "@/components/red-card";
import Popup from "@/components/popup";
import Loading from "@/components/loading";

import api from "@/api";
import { getOpenedCardList, setOpenedCardList, share, shareLink, getCardList } from "@/utils";

type CardList = CardType[];

let count = 0;

const Card = () => {
    const [cardList, setCardList] = useState<CardList>([]);
    const [openedList, setOpenedList] = useState<boolean[]>([]);
    const [show, setShow] = useState(false);

    const sign = useRequest(api.getSignature);
    const { data, error, loading } = useRequest(api.getCardCollection);
    const moreCard = useRequest(api.getCardCollectionAfterShare, { manual: true });

    useEffect(() => {
        const list = getOpenedCardList();
        setOpenedList(list);
    }, []);

    useEffect(() => {
        setOpenedCardList(openedList);
    }, [openedList]);

    useEffect(() => {
        if (!data?.card_collection) {
            return;
        }

        const list = getCardList(data.card_collection);
        setCardList(list);
    }, [data]);

    if (error || moreCard.error || sign.error) {
        Toast.fail(error?.message ?? moreCard?.error?.message ?? sign?.error?.message);
    }
    if (loading) {
        return <Loading fullScreen />;
    }

    const onClick = () => {
        if (cardList.length < 5) {
            setShow(true);
            return;
        } else {
            history.push("/form", { from: "card" });
        }
    };

    const onOpenedAll = async () => {
        if (count < 1) {
            setShow(true);
            count += 1;
        }

        const url = new URL(window.location.href);
        url.search = "";

        await api.getSignature(url.toString());
        // await share(() => {
        //     moreCard.run();
        //     setShow(false);
        // });
        await shareLink();
    };

    return (
        <div className={styles.container}>
            <Popup src={popup.share} show={show} setShow={setShow} />

            <img src={common.pattern} className={styles.head} />

            <Cards
                className={styles.bigCard}
                cardList={cardList}
                setCardList={setCardList}
                openedList={openedList}
                setOpenedList={setOpenedList}
                onOpenedAll={onOpenedAll}
            />

            <div className={styles.smallCardList}>
                {cards.map((word, index) => (
                    <RedCard
                        key={word}
                        className={styles.smallCard}
                        word={word}
                        number={openedList[index] ? 1 : 0}
                    />
                ))}
            </div>

            <Button
                className={classnames(styles.btn, cardList.length < 5 && styles.btnDisable)}
                onClick={onClick}
            >
                立即合成
            </Button>
        </div>
    );
};

export default Card;
