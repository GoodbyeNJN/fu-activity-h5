import { useState } from "react";
import classnames from "classnames";
import styles from "./index.less";
import AreaImage from "@/components/AreaImage";
import indexPage from "@/assets/images/index-page.png";

export default () => {
    const [areaClassname, setAreaClassname] = useState<string>("");

    const setStyleToTouched = () => {
        setAreaClassname(styles.darken);
    };

    const setStyleToNormal = () => {
        setAreaClassname("");
    };

    return (
        <div className={styles.container}>
            {/* <img className={styles.bgImg} src={indexPage} useMap="#MM" />
            <map id="MM" name="MM">
                <area
                    shape="rect"
                    coords="20,20,80,80"
                    href="#rect"
                    alt="矩形"
                    onClick={() => {
                        console.log("124:");
                    }}
                />
            </map> */}
            <AreaImage
                className={styles.bgImg}
                src={indexPage}
                // src="https://via.placeholder.com/350x150"
                imgSize={{ w: 750, h: 1334 }}
                areaList={[
                    {
                        w: 285,
                        h: 62,
                        x: 233,
                        y: 1126,
                        className: areaClassname,
                        onTouchStart: setStyleToTouched,
                        onTouchMove: setStyleToNormal,
                        onTouchEnd: setStyleToNormal,
                        onTouchCancel: setStyleToNormal,
                    },
                ]}
                // debug
            />
        </div>
    );
};
