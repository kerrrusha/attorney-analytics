import {useTranslation} from "react-i18next";

function Flag({colorClassName}: { colorClassName: string }) {
    return <div style={{width: "1rem", height: "1rem"}} className={colorClassName}></div>;
}

export default function XvmAbout({xvm}: any) {
    const { t } = useTranslation();

    return (<div className="flex flex-column">
            <div className="flex flex-row align-items-center">
                <Flag colorClassName={xvm.BG_VIOLET}/>
                <span className="ml-3">- {t("xvm.more")} {xvm.violetValue}</span>
            </div>
            <div className="flex flex-row align-items-center">
                <Flag colorClassName={xvm.BG_BLUE}/>
                <span className="ml-3">- {t("xvm.less")} {xvm.violetValue}</span>
            </div>
            <div className="flex flex-row align-items-center">
                <Flag colorClassName={xvm.BG_GREEN}/>
                <span className="ml-3">- {t("xvm.less")} {xvm.blueValue}</span>
            </div>
            <div className="flex flex-row align-items-center">
                <Flag colorClassName={xvm.BG_YELLOW}/>
                <span className="ml-3">- {t("xvm.less")} {xvm.greenValue}</span>
            </div>
            <div className="flex flex-row align-items-center">
                <Flag colorClassName={xvm.BG_ORANGE}/>
                <span className="ml-3">- {t("xvm.less")} {xvm.yellowValue}</span>
            </div>
            <div className="flex flex-row align-items-center">
                <Flag colorClassName={xvm.BG_RED}/>
                <span className="ml-3">- {t("xvm.less")} {xvm.orangeValue}</span>
            </div>
        </div>);
}
