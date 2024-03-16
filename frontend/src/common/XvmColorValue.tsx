class XvmColorValue {

    private readonly COLOR_RED = "xvm-red";
    private readonly COLOR_ORANGE = "xvm-orange";
    private readonly COLOR_YELLOW = "xvm-yellow";
    private readonly COLOR_GREEN = "xvm-green";
    private readonly COLOR_BLUE = "xvm-blue";
    private readonly COLOR_VIOLET = "xvm-violet";

    private readonly BG_RED = "bg-xvm-red";
    private readonly BG_ORANGE = "bg-xvm-orange";
    private readonly BG_YELLOW = "bg-xvm-yellow";
    private readonly BG_GREEN = "bg-xvm-green";
    private readonly BG_BLUE = "bg-xvm-blue";
    private readonly BG_VIOLET = "bg-xvm-violet";

    private readonly orangeValue: number;
    private readonly yellowValue: number;
    private readonly greenValue: number;
    private readonly blueValue: number;
    private readonly violetValue: number;

    constructor(orangeValue: number, yellowValue: number, greenValue: number, blueValue: number, violetValue: number) {
        this.orangeValue = orangeValue;
        this.yellowValue = yellowValue;
        this.greenValue = greenValue;
        this.blueValue = blueValue;
        this.violetValue = violetValue;
    }

    getColorClassName(value: number) {
        if (!value) {
            return;
        }
        if (value < this.orangeValue) {
            return this.COLOR_RED;
        }
        if (value < this.yellowValue) {
            return this.COLOR_ORANGE;
        }
        if (value < this.greenValue) {
            return this.COLOR_YELLOW;
        }
        if (value < this.blueValue) {
            return this.COLOR_GREEN;
        }
        if (value < this.violetValue) {
            return this.COLOR_BLUE;
        }
        return this.COLOR_VIOLET;
    }

    getBgColorClassName(value: number) {
        if (value < this.orangeValue) {
            return this.BG_RED;
        }
        if (value < this.yellowValue) {
            return this.BG_ORANGE;
        }
        if (value < this.greenValue) {
            return this.BG_YELLOW;
        }
        if (value < this.blueValue) {
            return this.BG_GREEN;
        }
        if (value < this.violetValue) {
            return this.BG_BLUE;
        }
        return this.BG_VIOLET;
    }

    getStartRankValue(value: number) {
        if (value < this.orangeValue) {
            return 0;
        }
        if (value < this.yellowValue) {
            return this.orangeValue;
        }
        if (value < this.greenValue) {
            return this.yellowValue;
        }
        if (value < this.blueValue) {
            return this.greenValue;
        }
        if (value < this.violetValue) {
            return this.blueValue;
        }
        return this.violetValue;
    }

    getEndRankValue(value: number) {
        if (value < this.orangeValue) {
            return this.orangeValue;
        }
        if (value < this.yellowValue) {
            return this.yellowValue;
        }
        if (value < this.greenValue) {
            return this.greenValue;
        }
        if (value < this.blueValue) {
            return this.blueValue;
        }
        if (value < this.violetValue) {
            return this.violetValue;
        }
        return -1;
    }

    getInfoReactElement() {
        return (<div className="flex flex-column">
            <div className="flex flex-row align-items-center">
                <Flag colorClassName={this.BG_VIOLET} />
                <span className="ml-3">- more than {this.violetValue}</span>
            </div>
            <div className="flex flex-row align-items-center">
                <Flag colorClassName={this.BG_BLUE} />
                <span className="ml-3">- less than {this.violetValue}</span>
            </div>
            <div className="flex flex-row align-items-center">
                <Flag colorClassName={this.BG_GREEN} />
                <span className="ml-3">- less than {this.blueValue}</span>
            </div>
            <div className="flex flex-row align-items-center">
                <Flag colorClassName={this.BG_YELLOW} />
                <span className="ml-3">- less than {this.greenValue}</span>
            </div>
            <div className="flex flex-row align-items-center">
                <Flag colorClassName={this.BG_ORANGE} />
                <span className="ml-3">- less than {this.yellowValue}</span>
            </div>
            <div className="flex flex-row align-items-center">
                <Flag colorClassName={this.BG_RED} />
                <span className="ml-3">- less than {this.orangeValue}</span>
            </div>
        </div>);
    }
}

function Flag({colorClassName}: {colorClassName: string}) {
    return <div style={{width: "1rem", height: "1rem"}} className={colorClassName}></div>;
}

export const rateXvmColorValue = new XvmColorValue(0.4631, 0.4924, 0.526, 0.5785, 0.6355);
