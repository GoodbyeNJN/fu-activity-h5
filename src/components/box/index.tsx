import React from "react";
import classnames from "classnames";
import styles from "./styles.less";

import { box, prize as prizeSrc } from "@/assets/imgs";
import { PrizeWithoutKoi } from "@/utils/constant";

export type Prize = Exclude<PrizeWithoutKoi, "coupon"> | "coupon1" | "coupon2";

export interface Props {
    className?: string;
    prize?: Prize;
}

const Box: React.FC<Props> = props => {
    const { className, prize } = props;

    return (
        <>
            {!prize && <img src={box.spotlight} className={styles.spotlight} />}
            <div className={classnames(styles.container, className)}>
                <img src={box.border} className={styles.border} />

                {prize ? (
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
        </>
    );
};

export default Box;
