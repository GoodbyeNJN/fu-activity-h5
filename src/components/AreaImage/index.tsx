import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./index.less";

type Div = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

interface Size {
    w: number; // 在设计稿上的宽
    h: number; // 在设计稿上的高
}

interface Coords {
    x: number; // 左上角距离设计稿左上角的横向距离
    y: number; // 左上角距离设计稿左上角的纵向距离
}

type AreaRect = Size & Coords;

type Area = AreaRect & Div;

export interface Props extends Div {
    src: string; // 图片地址
    imgSize: Size; // 图片宽高
    areaList: Area[]; // 热区列表
    debug?: boolean; // 调试模式，热区高亮以方便调试
}

const mapName = Math.random().toString().slice(2, 12);

const getClientAreaRect = (clientImgSize: Size, imgSize: Size, areaRect: AreaRect) => {
    const xScale = clientImgSize.w / imgSize.w;
    const yScale = clientImgSize.h / imgSize.h;

    return {
        x: areaRect.x * xScale,
        y: areaRect.y * yScale,
        w: areaRect.w * xScale,
        h: areaRect.h * yScale,
    };
};

export default (props: Props) => {
    const { imgSize, areaList, debug, className, ...restProps } = props;

    const imgRef = useRef<HTMLImageElement>(null);
    const [clientAreaRect, setClientAreaRect] = useState<AreaRect[]>([]);

    useEffect(() => {
        const updateAreas = () => {
            if (!imgRef.current) {
                return;
            }

            const clientImgSize = {
                w: imgRef.current.clientWidth,
                h: imgRef.current.clientHeight,
            };

            const clientAreaRectList = areaList.map(area => {
                const areaRect = { x: area.x, y: area.y, w: area.w, h: area.h };
                return getClientAreaRect(clientImgSize, imgSize, areaRect);
            });

            setClientAreaRect(clientAreaRectList);
        };

        updateAreas();
        window.addEventListener("resize", updateAreas);

        return () => {
            window.removeEventListener("resize", updateAreas);
        };
    }, [imgSize, areaList]);

    return (
        <div
            {...restProps}
            className={classNames(className, styles.img)}
            ref={imgRef}
            style={{
                background: `center / 100% 100% no-repeat url(${restProps.src})`,
            }}
        >
            {areaList.map((area, index) => {
                const {
                    x: areaX,
                    y: areaY,
                    w: areaW,
                    h: areaH,
                    className: areaClassName,
                    ...restAreaProps
                } = area;
                const { x = 0, y = 0, w = 0, h = 0 } = clientAreaRect[index] ?? {};

                return (
                    <div
                        key={`${x},${y}`}
                        {...restAreaProps}
                        className={classNames(
                            debug && styles.debugMask,
                            styles.area,
                            areaClassName,
                        )}
                        style={{ top: y, left: x, width: w, height: h }}
                    />
                );
            })}
        </div>
    );
};
