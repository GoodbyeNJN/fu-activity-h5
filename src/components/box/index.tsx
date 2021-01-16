import React from "react";
import classnames from "classnames";
import styles from "./styles.less";

import { box, prize as prizeSrc } from "@/assets/imgs";

export interface Props {
    className?: string;
    open?: boolean;
    prize?:
        | "phone"
        | "watch"
        | "earphone"
        | "snacks"
        | "coupon1"
        | "coupon2"
        | "tv"
        | "redEnvelope";
}

const Box: React.FC<Props> = props => {
    const { className, open = false, prize = "redEnvelope" } = props;

    return (
        <div className={classnames(styles.container, className)}>
            <img src={box.border} className={styles.border} />

            {open ? (
                <>
                    <img src={box.flash} className={styles.flash} />
                    <img src={box.open} className={styles.open} />
                    <img
                        src={prizeSrc[prize]}
                        className={classnames(styles.prize, styles[prize])}
                    />
                </>
            ) : (
                <img src={box.close} className={styles.close} />
            )}
        </div>
    );
};

export default Box;
