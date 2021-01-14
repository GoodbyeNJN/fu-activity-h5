import { history } from "umi";
import styles from "./styles.less";

import { common, rule } from "@/assets/images";
import Button from "@/components/button";

const { prize } = rule;

export default () => {
    return (
        <div className={styles.container}>
            <img src={common.fireworks} className={styles.fireworks} />

            <div className={styles.content}>
                <p className={styles.contentTitle}>活动规则</p>

                <div className={styles.contentText}>
                    <p>活动时间：</p>
                    <p>2021年1月18日00:00至2021年2月11日23:59</p>
                    <p>活动规则：</p>
                    <p>1、开福盒：点击打开福盒，即可抽取千万礼遇大奖，购vivo 5G手机100%中奖</p>

                    <div className={styles.prizeContainer}>
                        <div className={styles.line}>
                            <div>
                                <p>特等奖</p>
                                <img src={prize.tv} />
                            </div>
                            <div>
                                <p>特等奖</p>
                                <img src={prize.coupon} />
                            </div>
                            <div>
                                <p>一等奖</p>
                                <img src={prize.phone} />
                            </div>
                            <div>
                                <p>二等奖</p>
                                <img src={prize.watch} />
                            </div>
                            <div>
                                <p>三等奖</p>
                                <img src={prize.earphone} />
                            </div>
                        </div>

                        <div className={styles.line}>
                            <div>
                                <p>四等奖</p>
                                <img src={prize.snacks} />
                            </div>
                            <div>
                                <p>五等奖</p>
                                <img src={prize.redEnvelope} />
                            </div>
                            <div />
                            <div />
                            <div />
                        </div>
                    </div>

                    <p>
                        超级锦鲤奖：抽中6.6元红包的用户可选择放弃红包兑换V卡，凭V卡可参与超级锦鲤奖抽奖活动，有机会获得vivo全家桶（含vivo
                        X60手机+vivo WATCH智能手表+ vivo TWS Neo真无线耳机）
                    </p>
                    <p>
                        2、集福卡：点击即可翻3张卡牌，分享H5至微信好友或朋友圈，可额外获得2次翻卡机会，每张卡牌对应一份新年权益，集齐“福遇千万礼”五张卡牌，可至线下指定门店兑换福袋礼品一份（数量有限，先到先得）
                    </p>
                    <p>主办单位：</p>
                    <p>vivo湖北</p>
                    <p> 其他说明：</p>
                    <p>
                        用户抽中的实物礼品均以邮寄形式兑换，用户需准确填写购机门店地址以预约兑奖，无特殊原因则7日内发货，若遇到春节物流停运等问题，则延后发货，若因门店地址不准确影响发货则取消兑奖资格。
                    </p>
                    <p>同一用户只能参与一次活动，同一账号、同一手机号、同一设备等视为同一用户。</p>
                    <p>
                        如因不可抗力因素（包括不限于重大自然灾害事件、政府主管部门指令停止举办或遭受严重网络攻击、系统故障等）导致本活动无法继续举办的，vivo可决定暂停或终止活动。
                    </p>
                    <p>在法律法规允许的范围内，vivo公司有权对本次活动的格式条款作出解释。</p>
                    <p>产品图片仅供参考，请以实物为准。</p>
                </div>
            </div>

            <Button className={styles.btn} onClick={() => history.push("/")}>
                确认
            </Button>
        </div>
    );
};
