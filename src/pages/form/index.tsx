import { history, useParams } from "umi";
import styles from "./styles.less";

import { common, card } from "@/assets/images";
import Input from "@/components/input";
import Button from "@/components/button";

export default () => {
    const params = useParams();
    console.log("params:", params);

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

            <img src={common.fireworks} className={styles.fireworks} />

            <div className={styles.title}>个人信息</div>

            <div className={styles.form}>
                <Input label="姓名" />
                <Input label="所在区域" />
                <Input label="联系电话" />
                <Input label="邮寄地址" />
                <Input label="串码" />
            </div>

            <Button className={styles.btn} onClick={() => history.push("/")}>
                确认
            </Button>
        </div>
    );
};
