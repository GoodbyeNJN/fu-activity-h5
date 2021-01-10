import styles from "./styles.less";

import { my } from "@/assets/images";

const { prize } = my;

export default () => {
    return (
        <div className={styles.container}>
            <div className={styles.gifts}>
                <div className={styles.title}>我的奖品</div>

                <div className={styles.giftsList}>
                    <div className={styles.giftsListLine}>
                        <img src={prize.tv} />
                        <img src={prize.coupon} />
                        <img src={prize.phone} />
                    </div>
                    <div className={styles.giftsListLine}>
                        <img src={prize.watch} />
                        <img src={prize.earphone} />
                        <img src={prize.snacks} />
                    </div>
                    <div className={styles.giftsListLine}>
                        <img src={prize.redEnvelope} />
                        <img src={prize.set} />
                        <img />
                    </div>
                </div>
            </div>
            <div className={styles.cards}>
                <div className={styles.title}>我的福卡</div>

                <div className={styles.cardsList}>
                    {my.cards.map(src => (
                        <img key={src} src={src} />
                    ))}
                </div>
            </div>
        </div>
    );
};
