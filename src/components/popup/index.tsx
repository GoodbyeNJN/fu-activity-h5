import React from "react";
import classnames from "classnames";
import styles from "./styles.less";
import { useTouch } from "@/utils/hooks";

import { btn, popup } from "@/assets/imgs";

export interface Props {
    className?: string;
    show: boolean;
    setShow: (show: boolean) => void;
    src?: string;
}

const Popup: React.FC<Props> = props => {
    const { children, className, show, setShow, src } = props;

    const close = useTouch(styles.close);

    if (!show) {
        return null;
    }

    return (
        <div className={classnames(styles.container, className)}>
            <div className={styles.modal}>
                <div className={styles.text}>{children}</div>
                <img src={src ?? popup.long} className={styles.popup} />
            </div>

            <img
                src={btn.close}
                className={close.className}
                {...close.handlers}
                onClick={() => setShow(false)}
            />
        </div>
    );
};

export default Popup;
