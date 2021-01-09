import React, { useState } from "react";
import classnames from "classnames";

export type UseTouch = (
    initialClassName: string,
) => {
    className: string;
    handlers: Pick<
        React.DOMAttributes<Element>,
        "onTouchStart" | "onTouchEnd" | "onTouchCancel" | "onTouchMove"
    >;
};

export const useTouch: UseTouch = initialClassName => {
    const normalClassName = classnames(initialClassName, "btn-normal");
    const touchedClassName = classnames(initialClassName, "btn-touched");

    const [className, setClassName] = useState(normalClassName);

    const setToNormalClassName = () => setClassName(normalClassName);
    const setToTouchedClassName = () => setClassName(touchedClassName);

    const handlers = {
        onTouchStart: setToTouchedClassName,
        onTouchEnd: setToNormalClassName,
        onTouchCancel: setToNormalClassName,
        onTouchMove: setToNormalClassName,
    };

    return { className, handlers };
};
