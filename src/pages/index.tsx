import styles from "./index.less";
import indexPage from "@/assets/images/index-page.png";

export default () => {
    return (
        <div className={styles.container}>
            <img className={styles.bgImg} src={indexPage} useMap="#MM" />
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
            </map>
        </div>
    );
};
