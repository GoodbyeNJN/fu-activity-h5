import React from "react";
import classnames from "classnames";
import styles from "./styles.less";
import { useTouch } from "@/utils/hooks";
import utils from "@/utils";

type Button = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

interface Props extends Button {
    test?: string;
}

const isSafari = utils.isSafari() && utils.isIos();

const Button: React.FC<Props> = props => {
    const { children, className, style, ...restProps } = props;

    const button = useTouch(styles.button);

    return (
        <div className={className} style={style}>
            <button className={button.className} {...button.handlers} {...restProps}>
                <div className={styles.content}>{children}</div>

                <div
                    className={classnames(
                        styles.border,
                        isSafari ? styles.isSafari : styles.isNotSafari,
                    )}
                >
                    <div className={classnames(styles.corner, styles.topLeft)}>
                        <div className={styles.outer} />
                        <div className={styles.inner} />
                    </div>
                    <div className={classnames(styles.corner, styles.topRight)}>
                        <div className={styles.outer} />
                        <div className={styles.inner} />
                    </div>
                    <div className={classnames(styles.corner, styles.bottomLeft)}>
                        <div className={styles.outer} />
                        <div className={styles.inner} />
                    </div>
                    <div className={classnames(styles.corner, styles.bottomRight)}>
                        <div className={styles.outer} />
                        <div className={styles.inner} />
                    </div>
                    <div className={styles.center}>
                        <div className={styles.outer} />
                        <div className={styles.inner} />
                    </div>
                </div>
            </button>
        </div>
    );
};

export default Button;
