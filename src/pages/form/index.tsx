import { useState } from "react";
import { history } from "umi";
import { Picker, Toast } from "antd-mobile";
import styles from "./styles.less";

import { common, fireworks } from "@/assets/imgs";
import Input from "@/components/input";
import Button from "@/components/button";

const data = [
    { value: "光谷步行街体验中心", label: "光谷步行街体验中心     距离：5km" },
    { value: "天桥阳光", label: "天桥阳光     距离：5km" },
    { value: "咸安区万达广场体验中心", label: "咸安区万达广场体验中心     距离：5km" },
];

const Form = () => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState("");

    const query = history.location.query;
    const isFromCard = query?.from === "card";

    return (
        <div className={styles.container}>
            {/* {isPoped && (
                <div className={styles.mask}>
                    <img src={box.popup} className={styles.popup} />
                    <img
                        src={box.closeBtn}
                        className={styles.closeBtn}
                        onClick={() => setIsPoped(false)}
                    />
                </div>
            )} */}

            <img src={fireworks.big} className={styles.fireworks} />

            <div className={styles.title}>{isFromCard ? "兑换福袋" : "个人信息"}</div>

            {isFromCard ? (
                <div className={styles.form}>
                    <Input label="姓名" />
                    <Input label="联系电话" />
                    <Input
                        label="兑换门店"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onClick={() => setShow(true)}
                    />
                    <Button className={styles.btnNav}>导航到门店</Button>
                    <Input label="密钥" />
                    {/* <Input label="邮寄地址" /> */}
                    {/* <Input label="串码" /> */}
                </div>
            ) : (
                <div className={styles.form}>
                    <Input label="姓名" />
                    <Input label="所在区域" />
                    <Input label="联系电话" />
                    <Input
                        label="兑换门店"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onClick={() => setShow(true)}
                    />
                    <Input label="密钥" />
                    {/* <Input label="邮寄地址" /> */}
                    {/* <Input label="串码" /> */}
                </div>
            )}

            <Picker
                visible={show}
                data={data}
                cols={1}
                onChange={e => {
                    const v = e?.[0];
                    data.forEach(({ value, label }) => {
                        value === v && setValue(value);
                    });
                }}
                onOk={() => setShow(false)}
                onDismiss={() => setShow(false)}
            />

            <Button className={styles.btn} onClick={() => Toast.info("兑换成功！")}>
                确认
            </Button>
        </div>
    );
};

export default Form;
