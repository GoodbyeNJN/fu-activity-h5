const isIos = () => {
    const userAgent = (navigator?.userAgent ?? "").toLowerCase();
    const isIpod = /ipod.+?os (\d+)/.test(userAgent);
    const isIpad = /ipad.+?os (\d+)/.test(userAgent);
    const isIphone = /iphone(?:.+?os (\d+))?/.test(userAgent) && !isIpad;
    return isIpod || isIpad || isIphone;
};

const isSafari = () => {
    const userAgent = (navigator?.userAgent ?? "").toLowerCase();
    const isSafari = /version\/(\d+).+?safari/.test(userAgent);
    return isSafari;
};

export default {
    isIos,
    isSafari,
};
