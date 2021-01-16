import React from "react";
import classnames from "classnames";
import styles from "./styles.less";

import { card } from "@/assets/imgs";

export interface Props {
    className?: string;
    number?: 0 | 1;
    word?: "fu" | "yu" | "qian" | "wan" | "li";
}

const { red } = card;

const RedCard: React.FC<Props> = props => {
    const { className, number = 0, word = "fu" } = props;

    return (
        <div className={classnames(styles.container, className)}>
            <img src={red.badge[number]} className={styles.badge} />
            <img src={red[word]} className={styles.word} />
            <img src={red.background} className={styles.card} />
        </div>
    );
};

export default RedCard;
