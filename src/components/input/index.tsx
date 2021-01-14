import React from "react";
import styles from "./styles.less";
import { common } from "@/assets/images";

type Input = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface Props extends Input {
    label: string;
}

export default (props: Props) => {
    const { className, style, label, ...restProps } = props;

    return (
        <div className={className} style={style}>
            <div className={styles.inputContainer}>
                <div className={styles.label}>{label}</div>
                <input className={styles.input} {...restProps} />

                <img src={common.inputBorder} className={styles.background} />
            </div>
        </div>
    );
};
