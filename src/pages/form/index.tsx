import { useEffect, useMemo, useState } from "react";
import { history, useRequest } from "umi";
import { Toast } from "antd-mobile";
import styles from "./styles.less";

import { fireworks } from "@/assets/imgs";
import Input from "@/components/input";
import Button from "@/components/button";
import Loading from "@/components/loading";
import ShopModal from "@/components/shop-modal";
import Modal from "@/components/modal";

import api, { RedeemerInfo, WinnerInfo, Shop } from "@/api";
import utils from "@/utils";
import { login } from "@/utils/login";

interface ExtendsShop extends Shop {
    distance: number;
}

const Form = () => {
    useEffect(() => {
        utils.wxInit();
        login();
    }, []);

    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState("");
    const [confirmHandler, setConfirmHandler] = useState(() => {});
    const [shop, setShop] = useState<Shop>({
        area: "",
        name: "",
        address: "",
        longitude: 0,
        latitude: 0,
        contact_phone: "",
    });
    const [bagForm, setBagForm] = useState<RedeemerInfo>({
        name: "",
        mobile: "",
        shop_name: "",
        key: "",
        area: utils.getArea(),
    });
    const [prizeForm, setPrizeForm] = useState<WinnerInfo>({
        name: "",
        mobile: "",
        mobile_code: "",
        address: "",
        area: utils.getArea(),
    });

    const location = useRequest(utils.getLocation, { manual: true, formatResult: res => res });
    const shopList = useRequest(api.getShopList, { manual: true });
    const prize = useRequest(api.submitWinnerInfo, { manual: true });
    const bag = useRequest(api.syntheticCard, { manual: true });

    const data = useMemo(() => {
        if (location.data && shopList.data) {
            const myLocation = location.data;

            const newShopList = shopList.data.map(shop => {
                const newShop: ExtendsShop = { ...shop, distance: 0 };

                const { latitude, longitude } = shop;
                const distance = utils.getDistance({ latitude, longitude }, myLocation).toFixed(1);
                newShop.distance = parseFloat(distance);

                return newShop;
            });
            newShopList.sort((a, b) => a.distance - b.distance);

            return newShopList;
        } else if (shopList.data) {
            return shopList.data.map(shop => ({ ...shop, distance: 0 }));
        }

        return [];
    }, [location.data, shopList.data]);

    useEffect(() => {
        if (bag.data?.card_collection.wufu || prize.data === null) {
            // Toast.success(
            //     <div>
            //         信息提交成功！
            //         <br />
            //         奖品会根据您填写的信息寄出，详情参考活动规则
            //     </div>,
            //     3,
            //     () => {
            //         history.push("/my");
            //     },
            // );
            setConfirmHandler(onClickConfirm);
            setModalText("核销成功");
            setShowModal(true);
        }
    }, [prize.data, bag.data]);

    if (shopList.error) {
        Toast.fail(shopList.error?.message);
    }

    if (prize.error || bag.error) {
        setConfirmHandler(() => {});
        setModalText(prize.error?.message ?? bag.error?.message ?? "核销异常");
        setShowModal(true);
    }

    const query = history.location.query;
    const isFromBag = query?.from === "bag";

    const onClickShop = async () => {
        await location.run();
        await shopList.run();

        setShow(true);
    };

    const onClickNavBtn = () => {
        shop
            ? utils.navigateToLocation(
                  {
                      longitude: shop.longitude,
                      latitude: shop.latitude,
                  },
                  shop.name,
                  shop.address,
              )
            : Toast.info("请先选择兑换门店");
    };

    const onClickConfirm = () => {
        history.push("/my");
    };

    const onClickCancel = () => {};

    const onRedeem = () => {
        if (isFromBag) {
            bag.run(bagForm);
        } else {
            prize.run(prizeForm);
        }
    };

    const updateBagForm = (key: keyof RedeemerInfo, value: any) => {
        const newState = { ...bagForm };
        newState[key] = value;

        setBagForm(newState);
    };

    const updatePrizeForm = (key: keyof WinnerInfo, value: any) => {
        const newState = { ...prizeForm };
        newState[key] = value;

        setPrizeForm(newState);
    };

    return (
        <div className={styles.container}>
            {/* {isPoped && (
                <div className={styles.mask}>
                    <img src={box.popup} className={styles.popup} />
                    <img
                        src={box.closeBtn}
                        className={styles.closeBtn}
                        onClick={() => setIsPoped(false)}
                    />
                </div>
            )} */}

            <img src={fireworks.big} className={styles.fireworks} />

            {(prize.loading || bag.loading) && <Loading className={styles.loading} />}
            {(location.loading || shopList.loading) && <Loading className={styles.loading} />}

            <div className={styles.title}>{isFromBag ? "兑换福袋" : "个人信息"}</div>

            {isFromBag ? (
                <div className={styles.form}>
                    <Input
                        label="姓名"
                        value={bagForm.name}
                        onChange={e => updateBagForm("name", e.target.value)}
                    />
                    <Input
                        label="联系电话"
                        value={bagForm.mobile}
                        onChange={e => updateBagForm("mobile", e.target.value)}
                    />
                    <Input
                        label="兑换门店"
                        value={shop.name}
                        placeholder="请选择兑换门店"
                        onChange={() => {}}
                        onClick={onClickShop}
                        disabled
                    />
                    <Button className={styles.btnNav} onClick={onClickNavBtn}>
                        导航到门店
                    </Button>
                    <Input
                        label="密钥"
                        value={bagForm.key}
                        onChange={e => updateBagForm("key", e.target.value)}
                    />
                </div>
            ) : (
                <div className={styles.form}>
                    <Input
                        label="姓名"
                        value={prizeForm.name}
                        onChange={e => updatePrizeForm("name", e.target.value)}
                    />
                    <Input
                        label="联系电话"
                        value={prizeForm.mobile}
                        onChange={e => updatePrizeForm("mobile", e.target.value)}
                    />
                    <Input
                        label="邮寄地址"
                        value={prizeForm.address}
                        onChange={e => updatePrizeForm("address", e.target.value)}
                    />
                    <Input
                        label="串码"
                        value={prizeForm.mobile_code}
                        onChange={e => updatePrizeForm("mobile_code", e.target.value)}
                    />
                </div>
            )}

            <Modal
                className={styles.modal}
                show={showModal}
                setShow={setShowModal}
                onCancel={onClickCancel}
                onConfrim={confirmHandler}
            />

            <ShopModal
                show={show}
                setShow={setShow}
                data={data}
                onClickListItem={shop => {
                    updateBagForm("shop_name", shop.name);
                    setShop(shop);
                    setShow(false);
                }}
            />

            <Button className={styles.btn} onClick={onRedeem}>
                确认
            </Button>
        </div>
    );
};

export default Form;
