class HLInputElement extends HLElement {
    constructor(type: string) {
        super("input", []);
        this.attrs["type"] = type;
    }
    disabled(d = true) {
        return this.setAttr("disabled", d);
    }
    readonly(d = true) {
        return this.setAttr("readonly", d);
    }
    placeholder(p: string) {
        return this.setAttr("placeholder", p);
    }
    autocomplete(a = true) {
        return this.setAttr("autocomplete", a);
    }
    name(n: string) {
        return this.setAttr("name", n);
    }
    initialValue(v: string) {
        return this.setAttr("value", v);
    }
}

class HLDateField extends HLInputElement {
    constructor() {
        super("checkbox");
    }
}

class HLFileUpload extends HLInputElement {
    constructor() {
        super("file");
    }
    allowedFileTypes(types: string[]) {
        return this.setAttr("accept", types.join(","));
    }
    multiple(x = true) {
        return this.setAttr("multiple", x);
    }
    capture(x: "user" | "environment") {
        return this.setAttr("capture", x);
    }
}

class HLTextField extends HLInputElement {
    constructor(type: string) {
        super(type);
    }
    maxlength(l: number) {
        return this.setAttr("maxlength", l);
    }
    minlength(l: number) {
        return this.setAttr("minlength", l);
    }
    min(x: number) {
        return this.setAttr("min", x);
    }
    max(x: number) {
        return this.setAttr("max", x);
    }
    pattern(p: string | RegExp) {
        return this.setAttr("pattern", p as string);
    }
    multiple(x = true) {
        return this.setAttr("multiple", x);
    }
    size(x: number) {
        return this.setAttr("size", x);
    }
}
