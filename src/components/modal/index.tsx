import React from "react";
import classnames from "classnames";
import styles from "./styles.less";

import { btn, popup } from "@/assets/imgs";

export interface Props {
    className?: string;
    show: boolean;
    setShow: (show: boolean) => void;
    onConfrim: () => void;
    onCancel: () => void;
}

const Modal: React.FC<Props> = props => {
    const { children, className, show, setShow, onConfrim, onCancel } = props;

    if (!show) {
        return null;
    }

    return (
        <div className={classnames([styles.container, className])}>
            <img src={popup.short} className={styles.modal} />
            <img
                src={btn.return}
                className={styles.return}
                onClick={() => {
                    setShow(false);
                    onCancel();
                }}
            />
            <img
                src={btn.confirm}
                className={styles.confirm}
                onClick={() => {
                    setShow(false);
                    onConfrim();
                }}
            />

            <div className={styles.text}>{children}</div>
        </div>
    );
};

export default Modal;
