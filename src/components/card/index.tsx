import React, { useState } from "react";
import { history } from "umi";
import classnames from "classnames";
import styles from "./styles.less";

import "animate.css";

import { card } from "@/assets/imgs";

type Icon = "a" | "b" | "c" | "d" | "e";
type Word = "fu" | "yu" | "qian" | "wan" | "li";
type Cards = (Word | undefined)[];

export interface Props {
    className?: string;
    cards: Cards;
    setCards: (cards: Cards) => void;
}

const { covered, opened } = card;

const words: Word[] = ["fu", "yu", "qian", "wan", "li"];
const icons: Icon[] = ["a", "b", "c", "d", "e"];

const Card: React.FC<Props> = props => {
    const { className, cards, setCards } = props;

    const [index, setIndex] = useState<number>(0);

    const openCard = () => {
        const newCards = [...cards];
        newCards[index] = words[index];
        setCards(newCards);
    };

    const onToggle = (flag: 1 | -1) => {
        if (flag < 0) {
            index === 0 ? setIndex(cards.length - 1) : setIndex(prev => prev - 1);
        } else {
            index === cards.length - 1 ? setIndex(0) : setIndex(prev => prev + 1);
        }
    };

    return (
        <div className={classnames(styles.container, className)}>
            <img
                src={covered.arrow}
                className={classnames(styles.arrow, styles.left)}
                onClick={() => onToggle(-1)}
            />
            {cards[index] ? (
                <img
                    src={opened[cards[index] ?? "fu"]}
                    className={styles.opened}
                    onClick={() => history.push("/")}
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

            <div className={styles.text}>哇！恭喜获得{cards.length}张福卡！</div>
        </div>
    );
};

export default Card;
