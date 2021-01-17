import React, { useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./styles.less";

import "animate.css";

import { card } from "@/assets/imgs";
import { Card as CardType, cards, icons, cardInfoMap } from "@/utils/constant";

type CardList = CardType[];

export interface Props {
    className?: string;
    cardList: CardList;
    setCardList: (cardList: CardList) => void;
    openedList: boolean[];
    setOpenedList: (openedList: boolean[]) => void;
    onOpenedAll: () => void;
}

const { covered, opened } = card;

const Card: React.FC<Props> = props => {
    const { className, cardList, setCardList, openedList, setOpenedList, onOpenedAll } = props;

    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        !openedList.includes(false) && onOpenedAll();
    }, [onOpenedAll, openedList]);

    const openCard = () => {
        const newState = [...openedList];
        newState[index] = true;
        setOpenedList(newState);
    };

    const onToggle = (flag: 1 | -1) => {
        if (flag < 0) {
            index === 0 ? setIndex(cardList.length - 1) : setIndex(prev => prev - 1);
        } else {
            index === cardList.length - 1 ? setIndex(0) : setIndex(prev => prev + 1);
        }
    };

    return (
        <div className={classnames(styles.container, className)}>
            <img
                src={covered.arrow}
                className={classnames(styles.arrow, styles.left)}
                onClick={() => onToggle(-1)}
            />
            {openedList[index] ? (
                <img
                    src={opened[cardList[index]]}
                    className={styles.opened}
                    onClick={() => {
                        window.location.href = cardInfoMap[cardList[index]].link;
                    }}
                />
            ) : (
                <img src={covered[icons[index]]} className={styles.covered} onClick={openCard} />
            )}
            <img
                src={covered.arrow}
                className={classnames(styles.arrow, styles.right)}
                onClick={() => onToggle(1)}
            />

            <img src={card.border} className={styles.border} />

            <div className={styles.text}>哇！恭喜获得{cardList.length}张福卡！</div>
        </div>
    );
};

export default Card;
