interface HLEventListener {
    type: string;
    callback: EventCallback;
    capture: boolean;
}

type EventCallback = (ev: Event) => void;

class HLElement {
    classes: string[] = [];
    attrs: { [key: string]: any } = {};
    inlineStyle: { [attr: string]: any } = {};
    children: any[] = [];
    tagName: string;
    eventListeners: HLEventListener[];
    flexboxStyle: null | FlexboxConfig = null;

    constructor(tagName: string, children: any[] = []) {
        this.tagName = tagName;
        this.children = children;

        this.eventListeners = [];
    }

    setAttr(attr: string, val: string | boolean | number = true) {
        this.attrs[attr] = val;
        return this;
    }

    setFlexboxStyle(buildFunction: (f: FlexboxConfig) => FlexboxConfig) {
        this.flexboxStyle = buildFunction(new FlexboxConfig());
        return this;
    }

    onEvent(event: string, cb: EventCallback, capture: boolean = true) {
        this.eventListeners.push({
            type: event,
            callback: cb,
            capture: capture,
        });
        return this;
    }

    // Global attribute wrappers

    id(id: string) {
        return this.setAttr("id", id);
    }
    contentEditable(i = true) {
        return this.setAttr("contenteditable", i);
    }
    draggable(i = true) {
        return this.setAttr("draggable", i);
    }
    spellcheck(i: boolean) {
        return this.setAttr("spellcheck", i);
    }
    appendStyleRule(style: { [attr: string]: string }) {
        for (let [attr, value] of style.entries()) {
            this.inlineStyle[attr] = value;
        }
        return this;
    }
    style(style: { [attrName: string]: string }) {
        this.appendStyleRule(style);
        return this;
    }

    buildStyleAttribute() {
        return (
            this.inlineStyle
                .entries()
                .map((entry) => {
                    let styleAttr = entry[0];
                    let value = entry[1];
                    return styleAttr + ": " + value + ";";
                })
                .join(";") + ";"
        );
    }

    class(className: string) {
        if (className) {
            this.classes.push(className);
        }
        return this;
    }

    // Text formatting syntactic sugar

    italicized() {
        return new HLElement("em", [this]);
    }
    strikethrough() {
        return new HLElement("s", [this]);
    }
    bold() {
        return new HLElement("strong", [this]);
    }
    superscripted() {
        return new HLElement("sup", [this]);
    }
    subscripted() {
        return new HLElement("sub", [this]);
    }

    // Event listener wrappers for common events

    onClick(cb: EventCallback) {
        this.onEvent("click", cb);
        return this;
    }

    // Represent this HLElement as an HTML Element
    render() {
        if (this.flexboxStyle) {
            this.appendStyleRule(this.flexboxStyle.getStylesheetObject());
        }

        let htmlElement = document.createElement(this.tagName);

        // Set element class(es)
        if (this.classes.length > 0) {
            htmlElement.classList.add(...this.classes);
        }

        // Set HTML attributes
        for (let [attr, e] of this.attrs.entries()) {
            htmlElement.setAttribute(attr, e);
        }

        // Set element style
        for (let [attr, value] of this.inlineStyle.entries()) {
            (htmlElement.style as any)[attr] = value;
        }

        // Build content
        for (let child of this.children) {
            if (child === null) {
                continue;
            }
            let childNode = htmless.valueToNode(child);
            htmlElement.appendChild(childNode);
        }

        // Add event listeners
        for (let listener of this.eventListeners) {
            htmlElement.addEventListener(
                listener.type as any,
                listener.callback,
                listener.capture
            );
        }

        return htmlElement;
    }
}

class HTMLess {
    trackedNodes: Map<Node, Component>;
    inlineComponents: { [id: string]: Component };
    inlineComponentLabels: { [id: string]: string[] };

    constructor() {
        // A component-DOM lookup table
        // key: Component instance
        // value: array of DOM elements that correspond to each rendered instance of the component
        this.trackedNodes = new Map();

        this.inlineComponents = {};
        this.inlineComponentLabels = {};
    }
    renderComponent(component: Component) {
        let rendered = this.valueToNode(component.body());

        if (rendered instanceof DocumentFragment) {
            throw new Error(
                "For simplicity, component bodies cannot be document fragments (a node representing multiple elements). Try encapsulating it inside a div"
            );
        }

        this.trackedNodes.set(rendered, component);

        return rendered;
    }

    inlineComponent(f: () => HLElement) {
        let comp = new InlineComponent();
        comp.body = f;

        return comp;
    }

    getInlineComponent(id: string) {
        let component = this.inlineComponents[id];
        if (component === undefined) {
            throw new Error("No inline component with id '" + id + "' exists");
        }
        return component;
    }

    getInlineComponentsByLabel(label: string) {
        let componentIds = this.inlineComponentLabels[label];
        if (componentIds === undefined) {
            throw new Error("No such label '" + label + "' exists");
        }

        return componentIds.map((id) => this.getInlineComponent(id));
    }

    rerenderComponent(component: Component) {
        let elementsToReplace = [];
        for (let [
            element,
            associatedComponent,
        ] of this.trackedNodes.entries()) {
            if (component === associatedComponent) {
                elementsToReplace.push(element);
            }
        }

        for (let element of elementsToReplace) {
            this.trackedNodes.delete(element); // remove
            let rendered = component.body().render();
            (element as Element).replaceWith(rendered);
            this.trackedNodes.set(rendered, component);
        }

        // garbage collection

        for (let element of this.trackedNodes.keys()) {
            if (!document.contains(element)) {
                this.trackedNodes.delete(element);
            }
        }
    }

    rerenderInlineComponent(id: string) {
        this.rerenderComponent(this.getInlineComponent(id));
    }

    rerender(x: Component | string) {
        if (x instanceof Component) {
            this.rerenderComponent(x);
        } else {
            this.rerenderInlineComponent(x);
        }
    }

    rerenderLabel(label: string) {
        let components = this.getInlineComponentsByLabel(label);
        for (let c of components) {
            this.rerender(c);
        }
    }

    valueToNode(value: any): Node {
        // Take a value of an arbitrary type and represent it as an HTML element
        if (typeof value !== "object") {
            return document.createTextNode(value);
        }
        if (value instanceof Component) {
            let rendered = htmless.renderComponent(value);
            return rendered;
        }
        if (value instanceof Array) {
            let frag = document.createDocumentFragment();
            for (let n of value) {
                frag.appendChild(this.valueToNode(n));
            }
            return frag;
        }
        if (value.render) {
            return value.render();
        }
        throw new Error("Invalid child type");
    }

    getComponentId(c: InlineComponent) {
        for (let [id, component] of this.inlineComponents.entries()) {
            if (component === c) {
                return id;
            }
        }
    }

    labelComponent(c: Component, label: string) {
        if (c instanceof InlineComponent) {
            let id = this.getComponentId(c);

            if (!id) {
                throw new Error("Cannot label component with no associated ID");
            }

            if (this.inlineComponentLabels[label]) {
                this.inlineComponentLabels[label].push(id);
            } else {
                this.inlineComponentLabels[label] = [id];
            }
        } else {
            throw new Error("Cannot label non-inline component");
        }
    }
}
