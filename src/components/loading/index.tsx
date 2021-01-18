import React from "react";
import classnames from "classnames";
import styles from "./styles.less";

export interface Props {
    className?: string;
    fullScreen?: boolean;
}

const Loading: React.FC<Props> = props => {
    const { className, fullScreen } = props;

    return fullScreen ? (
        <div className={classnames(styles.container, className)}>
            <div className={styles.loader}>Loading...</div>
        </div>
    ) : (
        <div className={className}>
            <div className={styles.loader}>Loading...</div>
        </div>
    );
};

export default Loading;
