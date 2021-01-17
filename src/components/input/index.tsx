import React from "react";
import classnames from "classnames";
import styles from "./styles.less";
import { common } from "@/assets/imgs";

type Input = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface Props extends Input {
    label: string;
}

const Input: React.FC<Props> = props => {
    const { className, onClick, disabled, label, ...restProps } = props;

    return (
        <div className={className}>
            <div className={styles.inputContainer}>
                <div className={styles.label}>{label}</div>

                {disabled ? (
                    <>
                        <input className={styles.input} {...restProps} />
                        <span className={styles.cover} onClick={onClick} />
                    </>
                ) : (
                    <input className={styles.input} {...restProps} />
                )}

                <img src={common.inputBorder} className={styles.background} />
            </div>
        </div>
    );
};

export default Input;
