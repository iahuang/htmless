interface ObjectConstructor {
    entries(obj: {
        [key: string]: any;
    }): [string, any][];
}
interface Object {
    entries(): [string, any][];
}
interface HLEventListener {
    type: string;
    callback: EventCallback;
    capture: boolean;
}
declare type EventCallback = (ev: Event) => void;
declare class HLElement {
    classes: string[];
    attrs: {
        [key: string]: any;
    };
    children: any[];
    tagName: string;
    eventListeners: HLEventListener[];
    constructor(tagName: string, children?: any[]);
    setAttr(attr: string, val?: string | boolean | number): this;
    onEvent(event: string, cb: EventCallback, capture?: boolean): this;
    id(id: string): this;
    contentEditable(i?: boolean): this;
    draggable(i?: boolean): this;
    spellcheck(i: boolean): this;
    style(i: string): this;
    class(className: string): this;
    italicized(): HLElement;
    strikethrough(): HLElement;
    bold(): HLElement;
    superscripted(): HLElement;
    subscripted(): HLElement;
    onClick(cb: EventCallback): this;
    render(): HTMLElement;
}
declare class InlineHTMLElement {
    content: string;
    constructor(content: string);
    render(): DocumentFragment;
}
declare class HTMLess {
    trackedNodes: Map<Node, Component>;
    inlineComponents: {
        [id: string]: Component;
    };
    inlineComponentLabels: {
        [id: string]: string[];
    };
    constructor();
    renderComponent(component: Component): Node;
    inlineComponent(f: () => HLElement, id: string): InlineComponent;
    getInlineComponent(id: string): Component;
    getInlineComponentsByLabel(label: string): Component[];
    rerenderComponent(component: Component): void;
    rerenderInlineComponent(id: string): void;
    rerender(x: Component | string): void;
    rerenderLabel(label: string): void;
    valueToNode(value: any): Node;
    labelComponent(c: Component, label: string): void;
}
declare function elementWithAttrSetters(...attrNames: string[]): {
    new (tagName: string, children?: any[]): {
        classes: string[];
        attrs: {
            [key: string]: any;
        };
        children: any[];
        tagName: string;
        eventListeners: HLEventListener[];
        setAttr(attr: string, val?: string | number | boolean): any;
        onEvent(event: string, cb: EventCallback, capture?: boolean): any;
        id(id: string): any;
        contentEditable(i?: boolean): any;
        draggable(i?: boolean): any;
        spellcheck(i: boolean): any;
        style(i: string): any;
        class(className: string): any;
        italicized(): HLElement;
        strikethrough(): HLElement;
        bold(): HLElement;
        superscripted(): HLElement;
        subscripted(): HLElement;
        onClick(cb: EventCallback): any;
        render(): HTMLElement;
    };
};
declare function elementFunction(tagName: string, T?: typeof HLElement): (...children: any[]) => HLElement;
declare let div: (...children: any[]) => HLElement;
declare let span: (...children: any[]) => HLElement;
declare let hr: HLElement;
declare let paragraph: (...children: any[]) => HLElement;
declare let hyperlink: (...children: any[]) => HLElement;
declare let headers: {
    h1: (...children: any[]) => HLElement;
    h2: (...children: any[]) => HLElement;
    h3: (...children: any[]) => HLElement;
    h4: (...children: any[]) => HLElement;
    h5: (...children: any[]) => HLElement;
    h6: (...children: any[]) => HLElement;
};
declare let newline: HLElement;
declare let smallText: (...children: any[]) => HLElement;
declare let superscript: (...children: any[]) => HLElement;
declare let subscript: (...children: any[]) => HLElement;
declare let codeBlock: (...children: any[]) => HLElement;
declare let image: (src: string) => {
    classes: string[];
    attrs: {
        [key: string]: any;
    };
    children: any[];
    tagName: string;
    eventListeners: HLEventListener[];
    setAttr(attr: string, val?: string | number | boolean): any;
    onEvent(event: string, cb: EventCallback, capture?: boolean): any;
    id(id: string): any;
    contentEditable(i?: boolean): any;
    draggable(i?: boolean): any;
    spellcheck(i: boolean): any;
    style(i: string): any;
    class(className: string): any;
    italicized(): HLElement;
    strikethrough(): HLElement;
    bold(): HLElement;
    superscripted(): HLElement;
    subscripted(): HLElement;
    onClick(cb: EventCallback): any;
    render(): HTMLElement;
};
declare class HLVideoElement extends HLElement {
    autoplay(): this;
    controls(): this;
    width(x: number): this;
    height(x: number): this;
    loop(): this;
    muted(): this;
    poster(p: string): this;
    src(s: string): this;
}
declare let video: (...children: any[]) => HLElement;
declare let button: (...children: any[]) => HLElement;
declare class HLInputElement extends HLElement {
    constructor(type: string);
    disabled(d?: boolean): this;
    readonly(d?: boolean): this;
    placeholder(p: string): this;
    autocomplete(a?: boolean): this;
    name(n: string): this;
    initialValue(v: string): this;
}
declare class HLTextField extends HLInputElement {
    constructor(type: string);
    maxlength(l: number): this;
    minlength(l: number): this;
    min(x: number): this;
    max(x: number): this;
    pattern(p: string | RegExp): this;
    multiple(x?: boolean): this;
    size(x: number): this;
}
declare class HLDateField extends HLInputElement {
    constructor();
}
declare class HLFileUpload extends HLInputElement {
    constructor();
    allowedFileTypes(types: string[]): this;
    multiple(x?: boolean): this;
    capture(x: "user" | "environment"): this;
}
declare let input: {
    text: () => HLTextField;
    numeric: () => HLTextField;
    email: () => HLTextField;
    password: () => HLTextField;
    search: () => HLTextField;
    phoneNumber: () => HLTextField;
    url: () => HLTextField;
    checkbox: () => HLInputElement;
    radio: () => HLInputElement;
    date: () => HLInputElement;
    datetimeLocal: () => HLInputElement;
    month: () => HLInputElement;
    week: () => HLInputElement;
    file: () => HLFileUpload;
    color: () => HLInputElement;
};
declare let inlineHTML: (html: string) => InlineHTMLElement;
declare class Component {
    body(): HLElement;
    render(): Node;
}
declare class InlineComponent extends Component {
    id: string;
    constructor(id: string);
    label(l: string): this;
}
declare let htmless: HTMLess;
//# sourceMappingURL=htmless.d.ts.map