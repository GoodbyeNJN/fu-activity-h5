import { useState } from "react";
import { history } from "umi";
import { Picker } from "antd-mobile";
import styles from "./styles.less";

import { common, fireworks } from "@/assets/imgs";
import Button from "@/components/button";

const data = [
    { value: 1, label: "湖北" },
    { value: 2, label: "宜昌" },
];

export default () => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState("");

    return (
        <div className={styles.container}>
            <img src={fireworks.big} className={styles.fireworks} />
            <img src={common.pattern} className={styles.head} />

            <Button className={styles.openBtn} onClick={() => history.push("/box")}>
                开礼盒(抽奖)
            </Button>
            <Button className={styles.collectBtn} onClick={() => history.push("/card")}>
                集福卡
            </Button>

            <div className={styles.input}>
                <div className={styles.inputContainer}>
                    <div className={styles.label}>所在区域</div>
                    <input
                        className={styles.inputBar}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onClick={() => setShow(true)}
                    />
                    <Picker
                        visible={show}
                        data={data}
                        cols={1}
                        onChange={e => {
                            const v = e?.[0];
                            data.forEach(({ value, label }) => {
                                value === v && setValue(label);
                            });
                        }}
                        onOk={() => setShow(false)}
                        onDismiss={() => setShow(false)}
                    />

                    <img src={common.inputBorder} className={styles.background} />
                </div>
            </div>
        </div>
    );
};
