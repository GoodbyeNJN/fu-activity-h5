import React, { useEffect, useMemo, useState } from "react";
import classnames from "classnames";
import styles from "./styles.less";

import "animate.css";

import { card } from "@/assets/imgs";
import { Card as CardType, Cards, icons, cardInfoMap } from "@/utils/constant";

export interface Props {
    className?: string;
    cardList: Cards;
    setCardList: (cardList: Cards) => void;
    openedList: Cards;
    setOpenedList: (openedList: Cards) => void;
}

const { covered, opened } = card;

const Card: React.FC<Props> = props => {
    const { className, cardList, openedList, setOpenedList } = props;

    const [key, setKey] = useState<CardType>("fu");

    const [ownedCardList, ownedCardNumber] = useMemo<[Cards, number]>(() => {
        const ownedList = Object.entries(cardList).filter(([key, value]) => value !== 0);
        const ownedCardList = Object.fromEntries(ownedList) as Cards;
        const ownedCardNumber = ownedList.length;

        return [ownedCardList, ownedCardNumber];
    }, [cardList]);

    useEffect(() => {
        const keys = Object.keys(ownedCardList) as CardType[];
        setKey(keys[0]);
    }, [ownedCardList]);

    const openCard = () => {
        const newList = { ...openedList };
        newList[key] += 1;
        setOpenedList(newList);
    };

    const onToggle = (flag: 1 | -1) => {
        const keys = Object.keys(ownedCardList);
        const index = keys.indexOf(key);
        let newKey = "";

        if (flag < 0) {
            if (index === 0) {
                newKey = keys[keys.length - 1];
            } else {
                newKey = keys[index - 1];
            }
        } else {
            if (index === keys.length - 1) {
                newKey = keys[0];
            } else {
                newKey = keys[index + 1];
            }
        }

        setKey(newKey as CardType);
    };

    return (
        <div className={classnames(styles.container, className)}>
            <img
                src={covered.arrow}
                className={classnames(styles.arrow, styles.left)}
                onClick={() => onToggle(-1)}
            />
            {openedList[key] ? (
                <img
                    src={opened[key]}
                    className={styles.opened}
                    onClick={() => {
                        window.location.href = cardInfoMap[key].link;
                    }}
                />
            ) : (
                <img src={covered[icons[key]]} className={styles.covered} onClick={openCard} />
            )}
            <img
                src={covered.arrow}
                className={classnames(styles.arrow, styles.right)}
                onClick={() => onToggle(1)}
            />

            <img src={card.border} className={styles.border} />

            <div className={styles.text}>哇！恭喜获得{ownedCardNumber}张福卡！</div>
        </div>
    );
};

export default Card;
