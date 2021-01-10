import React from "react";
import classnames from "classnames";
import styles from "./styles.less";
import { useTouch } from "@/utils/hooks";

type Button = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

interface Props extends Button {
    test?: string;
}

export default (props: Props) => {
    const { children, className, ...restProps } = props;

    const button = useTouch(styles.button);

    return (
        <div className={className}>
            <button className={button.className} {...button.handlers} {...restProps}>
                <div className={styles.content}>{children}</div>

                <div className={styles.border}>
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
