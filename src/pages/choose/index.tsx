import { useState } from "react";
import { history } from "umi";
import { Picker, Toast } from "antd-mobile";
import { useTouch } from "@/utils/hooks";
import styles from "./styles.less";

import { common, fireworks, btn } from "@/assets/imgs";
import { areaList } from "@/utils/constant";
import Button from "@/components/button";
import Input from "@/components/input";

import { setArea } from "@/utils";

const Choose = () => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState("");

    const giftBtn = useTouch(styles.giftBtn);
    const ruleBtn = useTouch(styles.ruleBtn);

    const onClick = (path: string) => {
        if (value) {
            setArea(value);
            history.push(path);
        } else {
            Toast.info("请先选择区域再进入活动", 1);
        }
    };

    return (
        <div className={styles.container}>
            <img src={fireworks.big} className={styles.fireworks} />
            <img src={common.pattern} className={styles.head} />

            <Input
                className={styles.input}
                label="所在区域"
                placeholder="请选择所在区域"
                disabled
                value={value}
                onChange={() => {}}
                onClick={() => setShow(true)}
            />

            <Button className={styles.openBtn} onClick={() => onClick("/box")}>
                开礼盒(抽奖)
            </Button>
            <Button className={styles.collectBtn} onClick={() => onClick("/card")}>
                集福卡
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

            <Picker
                className={styles.picker}
                visible={show}
                data={areaList}
                cols={1}
                onChange={value => {
                    const v = value?.[0];
                    areaList.forEach(({ value, label }) => {
                        value === v && setValue(label);
                    });
                }}
                title="请选择所在区域"
                onOk={() => setShow(false)}
                onDismiss={() => setShow(false)}
            />
        </div>
    );
};

export default Choose;
