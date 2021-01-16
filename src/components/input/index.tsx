import React from "react";
import styles from "./styles.less";
import { common } from "@/assets/images";

type Input = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface Props extends Input {
    label: string;
}

const Input: React.FC<Props> = props => {
    const { className, label, ...restProps } = props;

    return (
        <div className={className}>
            <div className={styles.inputContainer}>
                <div className={styles.label}>{label}</div>
                <input className={styles.input} {...restProps} />

                <img src={common.inputBorder} className={styles.background} />
            </div>
        </div>
    );
};

export default Input;
