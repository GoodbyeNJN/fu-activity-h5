import React, { useState } from "react";
import classnames from "classnames";
import styles from "./styles.less";

import "animate.css";

import { card } from "@/assets/imgs";

type Icon = "a" | "b" | "c" | "d" | "e";

export interface Props {
    className?: string;
    word?: "fu" | "yu" | "qian" | "wan" | "li";
    onClickOpened?: () => void;
}

const { covered, opened } = card;

const icons: Icon[] = ["a", "b", "c", "d", "e"];

const Card: React.FC<Props> = props => {
    const { className, word = "fu", onClickOpened = () => {} } = props;

    const [cardSum, setCardSum] = useState(3);

    const [open, setOpen] = useState(false);
    // const [isAnimationStarted, setIsAnimationStarted] = useState(false);
    // const [isAnimationStopped, setIsAnimationStopped] = useState(true);

    const [iconIndex, setIconIndex] = useState<number>(0);

    const iconList = icons.slice(0, cardSum);

    const openCard = () => {
        // setIsAnimationStarted(true);
        // setIsAnimationStopped(false);
        // setTimeout(() => {
        //     setOpen(true);
        //     setIsAnimationStarted(false);
        //     setIsAnimationStopped(true);
        // }, 0);
        setOpen(true);
    };

    const onToggle = (flag: 1 | -1) => {
        if (flag < 0) {
            iconIndex === 0 ? setIconIndex(iconList.length - 1) : setIconIndex(prev => prev - 1);
        } else {
            iconIndex === iconList.length - 1 ? setIconIndex(0) : setIconIndex(prev => prev + 1);
        }
    };

    return (
        <div className={classnames(styles.container, className)}>
            <img
                src={covered.arrow}
                className={classnames(styles.arrow, styles.left)}
                onClick={() => onToggle(-1)}
            />
            {open ? (
                // {open && isAnimationStopped ? (
                <img src={opened[word]} className={styles.opened} onClick={onClickOpened} />
            ) : (
                <img
                    src={covered[iconList[iconIndex]]}
                    className={styles.covered}
                    onClick={openCard}
                />
            )}
            <img
                src={covered.arrow}
                className={classnames(styles.arrow, styles.right)}
                onClick={() => onToggle(1)}
            />

            <img src={card.border} className={styles.border} />

            {/* <div className={styles.text}>
                点击卡片{open && isAnimationStopped ? "兑换" : "翻开"}
            </div> */}
            <div className={styles.text}>哇！恭喜获得{cardSum}张福卡！</div>
        </div>
    );
};

export default Card;
