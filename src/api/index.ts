import { redEnvelope } from "@/pages/box/styles.less";
import { request } from "umi";

export interface Result {
    code: number;
    data: "coupon" | "earphone" | "phone" | "redEnvelope" | "snacks" | "tv" | "watch";
}

export default {
    openBox: Promise.resolve({ code: 0, data: "redEnvelope" }),
    // openBox: request<Result>("/api/open-box"),
};
