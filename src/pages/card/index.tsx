import { history } from "umi";
import styles from "./styles.less";

import { card } from "@/assets/images";
import Button from "@/components/button";

const { flippedCards, unflippedCards, smallCards } = card;

export default () => {
    return (
        <div className={styles.container}>
            <img src={card.head} className={styles.head} />

            <div>
                <img src={unflippedCards.a} className={styles.bigCard} />
            </div>

            <div className={styles.smallCardList}>
                <div className={styles.smallCard}>
                    <img src={smallCards.badge0} className={styles.badge} />
                    <img src={smallCards.fu} className={styles.card} />
                </div>
                <div className={styles.smallCard}>
                    <img src={smallCards.badge0} className={styles.badge} />
                    <img src={smallCards.yu} className={styles.card} />
                </div>
                <div className={styles.smallCard}>
                    <img src={smallCards.badge0} className={styles.badge} />
                    <img src={smallCards.qian} className={styles.card} />
                </div>
                <div className={styles.smallCard}>
                    <img src={smallCards.badge0} className={styles.badge} />
                    <img src={smallCards.wan} className={styles.card} />
                </div>
                <div className={styles.smallCard}>
                    <img src={smallCards.badge0} className={styles.badge} />
                    <img src={smallCards.li} className={styles.card} />
                </div>
            </div>

            <Button className={styles.btn} onClick={() => history.push("/")}>
                立即合成
            </Button>
        </div>
    );
};
