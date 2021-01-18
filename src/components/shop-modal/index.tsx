import React from "react";
import { List, Modal } from "antd-mobile";
import classnames from "classnames";
import styles from "./styles.less";

import { common } from "@/assets/imgs";

import { Shop } from "@/api";

interface ExtendsShop extends Shop {
    distance: number;
}

export interface Props {
    className?: string;
    show: boolean;
    setShow: (show: boolean) => void;
    data: ExtendsShop[];
    onClickListItem: (shop: ExtendsShop) => void;
}

const ShopModal: React.FC<Props> = props => {
    const { className, show, setShow, data, onClickListItem } = props;

    return (
        <Modal
            className={classnames(styles.modal, className)}
            title="请选择兑换门店"
            popup
            visible={show}
            onClose={() => setShow(false)}
            animationType="slide-up"
        >
            <List className={styles.list}>
                {data?.map(shop => (
                    <List.Item key={shop.name} onClick={() => onClickListItem(shop)}>
                        <div className={styles.listItem}>
                            <div className={styles.name}>{shop.name}</div>
                            <div className={styles.address}>{shop.address}</div>
                            <div className={styles.info}>
                                <img src={common.phoneIcon} className={styles.icon} />
                                <span>{shop.contact_phone}</span>
                                <span className={styles.divide}>|</span>
                                <img src={common.navIcon} className={styles.icon} />
                                <span>距离：{shop.distance}km</span>
                            </div>
                        </div>
                    </List.Item>
                ))}
            </List>
        </Modal>
    );
};

export default ShopModal;
