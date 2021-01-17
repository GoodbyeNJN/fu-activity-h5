import React from "react";
import styles from "./styles.less";
import { useTouch } from "@/utils/hooks";

import { btn } from "@/assets/imgs";

type Button = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

interface Props extends Button {
    test?: string;
}

const Button: React.FC<Props> = props => {
    const { children, className, style, ...restProps } = props;

    const button = useTouch(styles.button);

    return (
        <div className={className} style={style}>
            <button className={button.className} {...button.handlers} {...restProps}>
                <div className={styles.content}>{children}</div>

                <img src={btn.background} className={styles.border} />
            </button>
        </div>
    );
};

export default Button;
