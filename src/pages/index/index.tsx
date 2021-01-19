import { useEffect } from "react";
import { history, useRequest } from "umi";
import { useTouch } from "@/utils/hooks";
import { Toast } from "antd-mobile";
import styles from "./styles.less";

import { btn, index } from "@/assets/imgs";
import Button from "@/components/button";
import Loading from "@/components/loading";

import { login } from "@/utils/login";
import { wxInit, share } from "@/utils";

const Index = () => {
    const giftBtn = useTouch(styles.giftBtn);
    const ruleBtn = useTouch(styles.ruleBtn);

    const { error, loading } = useRequest(login);

    useEffect(() => {
        wxInit().then(() =>
            share(() => {
                console.log("分享成功");
            }),
        );
    }, []);

    if (error) {
        Toast.fail(error.message);
    }
    if (loading) {
        return <Loading fullScreen />;
    }

    return (
        <div className={styles.container}>
            <img src={index.content} className={styles.content} />
            <img src={index.phonePendant} className={styles.phone} />
            <img src={index.redEnvelopePendant} className={styles.redEnvelope} />

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

export default Index;
