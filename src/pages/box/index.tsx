import { useState } from "react";
import { history } from "umi";
import styles from "./styles.less";

import { box } from "@/assets/images";
import Button from "@/components/button";

const { module } = box;

export default () => {
    const [isOpened, setIsOpened] = useState(false);
    const [prize, setPrize] = useState("");

    const onClick = () => {
        if (isOpened) {
            setIsOpened(false);
        } else {
            setIsOpened(true);
        }
    };

    window.test = () => {
        const arr = Object.values(box.prize);
        let index = 0;

        setInterval(() => {
            setPrize(arr[index]);
            index += 1;
        }, 1000);
    };

    return (
        <div className={styles.container}>
            <img src={box.head} className={styles.head} />

            <div>
                <img src={module.container} className={styles.boxContainer} />

                {isOpened ? (
                    <>
                        <img src={module.open} className={styles.boxOpen} />
                        <img src={module.flash} className={styles.flash} />
                        <img src={prize} className={styles.prize} />
                    </>
                ) : (
                    <>
                        <img src={module.close} className={styles.boxClose} />
                        <img src={module.spotlight} className={styles.spotlight} />
                    </>
                )}
            </div>

            <Button className={styles.openBtn} onClick={onClick}>
                {isOpened ? "立即收下" : "打开福盒"}
            </Button>
        </div>
    );
};
