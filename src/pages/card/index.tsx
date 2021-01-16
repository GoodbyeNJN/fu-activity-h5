import { useState } from "react";
import { history } from "umi";
import classnames from "classnames";
import styles from "./styles.less";

import { common, popup } from "@/assets/imgs";
import Button from "@/components/button";
import Card from "@/components/card";
import RedCard from "@/components/red-card";
import Popup from "@/components/popup";

type Icon = "a" | "b" | "c" | "d" | "e";
type Word = "fu" | "yu" | "qian" | "wan" | "li";
type Cards = (Word | undefined)[];

const words: Word[] = ["fu", "yu", "qian", "wan", "li"];
const icons: Icon[] = ["a", "b", "c", "d", "e"];

export default () => {
    const [cards, setCards] = useState<Cards>([undefined, undefined, undefined]);
    const [show, setShow] = useState(false);

    const updateShow = (flag: boolean) => {
        if (!flag) {
            const newCards = [...cards, undefined, undefined];
            setCards(newCards);
            setShow(false);
        }
    };

    const onClick = () => {
        if (cards.length < 5) {
            setShow(true);
            return;
        } else {
            history.push("/form");
        }
    };

    return (
        <div className={styles.container}>
            <Popup src={popup.share} show={show} setShow={updateShow} />

            <img src={common.pattern} className={styles.head} />

            <Card className={styles.bigCard} cards={cards} setCards={setCards} />

            <div className={styles.smallCardList}>
                {words.map((word, index) => (
                    <RedCard
                        key={word}
                        className={styles.smallCard}
                        word={word}
                        number={word === cards[index] ? 1 : 0}
                    />
                ))}
            </div>

            <Button
                className={classnames(styles.btn, cards.length < 5 && styles.btnDisable)}
                onClick={onClick}
            >
                立即合成
            </Button>
        </div>
    );
};
