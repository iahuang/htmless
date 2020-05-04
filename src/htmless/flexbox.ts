class FlexboxConfig {
    direction: string = "row";
    justify: string = "start";
    align: string = "center";
    alignContent: string = "stretch";
    wrapMode: string = "nowrap"; // flex-wrap

    constructor() {}

    vertical() {
        this.direction = "column";
        return this;
    }

    justifyStart() {
        this.justify = "flex-start";
        return this;
    }

    justifyEnd() {
        this.justify = "flex-end";
        return this;
    }

    justifyCenter() {
        this.justify = "center";
        return this;
    }

    justifySpaceApart() {
        this.justify = "space-between";
        return this;
    }

    justifySpaceEven() {
        this.justify = "space-evenly";
        return this;
    }

    justifySpaceAround() {
        this.justify = "space-around";
        return this;
    }

    alignStretch() {
        this.align = "stretch";
        return this;
    }

    alignStart() {
        this.align = "flex-start";
        return this;
    }

    alignEnd() {
        this.align = "flex-end";
        return this;
    }

    alignBaseline() {
        this.align = "baseline";
        return this;
    }

    alignCenter() {
        this.align = "center";
        return this;
    }

    getStylesheetString() {
        return `display: flex; flex-direction: ${this.direction}; justify-content: ${this.justify}; align-items: ${this.align}; align-content: ${this.alignContent}; flex-wrap: ${this.wrapMode}`;
    }

    getStylesheetObject() {
        return {
            display: "flex",
            flexDirection: this.direction,
            justifyContent: this.justify,
            alignItems: this.align,
            alignContent: this.alignContent,
            flexWrap: this.wrapMode,
        };
    }
}

class StyleClassManager {
    private styles: Set<string> = new Set();
    constructor() {}
    compressStyle(style: string) {
        return style.replace(" ", "");
    }
    addStyle(style: string) {
        this.styles.add(this.compressStyle(style));
    }
}
