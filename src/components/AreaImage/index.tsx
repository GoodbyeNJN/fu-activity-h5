import { useEffect, useRef, useState } from "react";

export default props => {
    const mapName = useRef(Date.now().toString());

    useEffect(() => {
        window.addEventListener("resize");
    });

    return (
        <>
            <img useMap={mapName.current} />
            <map name={mapName.current}>
                <area
                    shape="rect"
                    coords="20,20,80,80"
                    href="#rect"
                    alt="矩形"
                    onClick={() => {
                        console.log("124:");
                    }}
                />
            </map>
        </>
    );
};
