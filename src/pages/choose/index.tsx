import { history } from "umi";
import styles from "./styles.less";

import { choose } from "@/assets/images";
import Button from "@/components/button";

export default () => {
    return (
        <div className={styles.container}>
            <img src={choose.head} className={styles.head} />

            <Button className={styles.openBtn} onClick={() => history.push("/box")}>
                开礼盒
            </Button>
            <Button className={styles.collectBtn} onClick={() => history.push("/card")}>
                集福卡
            </Button>
        </div>
    );
};
