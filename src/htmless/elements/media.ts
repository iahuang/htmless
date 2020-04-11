class HLImageElement extends HLElement {
    constructor(src: string) {
        super("img");
        this.setAttr("src", src);
    }
    alt(value: string) {
        return this.setAttr("alt", value);
    }
    crossorigin(mode: "anonymous"|"use-credentials") {
        return this.setAttr("crossorigin", mode);
    }
    decoding(mode: "sync"|"async"|"auto") {
        return this.setAttr("decoding", mode);
    }
    height(h: number) {
        return this.setAttr("height", h);
    }
    width(w: number) {
        return this.setAttr("width", w);
    }
    loading(mode: "eager"|"lazy") {
        return this.setAttr("loading", mode);
    }
}

class HLVideoElement extends HLElement {
    constructor() {
        super("video");
    }
    autoplay() {
        return this.setAttr("autoplay");
    }
    controls() {
        return this.setAttr("autoplay");
    }
    width(x: number) {
        return this.setAttr("width", x);
    }
    height(x: number) {
        return this.setAttr("height", x);
    }
    loop() {
        return this.setAttr("loop");
    }
    muted() {
        return this.setAttr("muted");
    }
    poster(p: string) {
        return this.setAttr("poster", p);
    }
    src(s: string) {
        return this.setAttr("src", s);
    }
}