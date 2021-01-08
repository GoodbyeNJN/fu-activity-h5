import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./index.less";

type Img = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

interface Size {
    w: number; // 在设计稿上的宽
    h: number; // 在设计稿上的高
}

interface Coords {
    x: number; // 左上角距离设计稿左上角的横向距离
    y: number; // 左上角距离设计稿左上角的纵向距离
}

type AreaRect = Size & Coords;

interface Area extends AreaRect {
    onTouch?: Function;
}

export interface Props extends Img {
    imgSize: Size; // 图片宽高
    areaList: Area[]; // 热区列表
    debug?: boolean; // 调试模式，热区高亮以方便调试
}

const mapName = Math.random().toString().slice(2, 12);

const getClientAreaCoords = (clientImgSize: Size, imgSize: Size, areaRect: AreaRect) => {
    const xScale = clientImgSize.w / imgSize.w;
    const yScale = clientImgSize.h / imgSize.h;

    const x = areaRect.x * xScale;
    const y = areaRect.y * yScale;
    const w = areaRect.w * xScale;
    const h = areaRect.h * yScale;

    return `${x},${y},${x + w},${y + h}`;
};

export default (props: Props) => {
    const { imgSize, areaList, debug, ...restProps } = props;

    const imgRef = useRef<HTMLImageElement>(null);
    const [coords, setCoords] = useState<string[]>([]);

    useEffect(() => {
        const updateCoords = () => {
            if (!imgRef.current) {
                return;
            }

            const clientImgSize = {
                w: imgRef.current.clientWidth,
                h: imgRef.current.clientHeight,
            };

            const coordsList = areaList.map(area => {
                const areaRect = { x: area.x, y: area.y, w: area.w, h: area.h };
                return getClientAreaCoords(clientImgSize, imgSize, areaRect);
            });

            console.log("coordsList:", coordsList);

            setCoords(coordsList);
        };

        window.addEventListener("resize", updateCoords);
        window.addEventListener("load", updateCoords);

        return () => {
            window.removeEventListener("resize", updateCoords);
            window.removeEventListener("load", updateCoords);
        };
    }, [imgSize, areaList]);

    return (
        <>
            <img {...restProps} useMap={mapName} ref={imgRef} />
            <map name={mapName}>
                {areaList.map((area, index) => (
                    <area
                        key={`${area.x},${area.y}`}
                        className={classNames(debug && styles.debugMask)}
                        shape="rect"
                        coords={coords[index]}
                        onClick={() => {
                            console.log("123:");
                        }}
                    />
                ))}
            </map>
        </>
    );
};
