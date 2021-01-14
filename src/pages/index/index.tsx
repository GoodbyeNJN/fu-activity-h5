import { history } from "umi";
import { useTouch } from "@/utils/hooks";
import styles from "./styles.less";

import { btn, index } from "@/assets/images";
import Button from "@/components/button";

export default () => {
    const giftBtn = useTouch(styles.giftBtn);
    const ruleBtn = useTouch(styles.ruleBtn);

    return (
        <div className={styles.container}>
            <img src={index.content} className={styles.content} />

            <Button className={styles.openBtn} onClick={() => history.push("/choose")}>
                福遇开启
            </Button>

            <img
                src={btn.gift}
                className={giftBtn.className}
                {...giftBtn.handlers}
                onClick={() => history.push("/my")}
            />
            <img
                src={btn.rule}
                className={ruleBtn.className}
                {...ruleBtn.handlers}
                onClick={() => history.push("/rule")}
            />
        </div>
    );
};
