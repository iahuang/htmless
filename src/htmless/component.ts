class Component {
    body(): HLElement {
        throw new Error("No render method specified for this component");
    }
    render() {
        return htmless.renderComponent(this);
    }
    rerender() {
        return htmless.rerender(this);
    }
}

class InlineComponent extends Component {
    constructor() {
        super();
    }
    id(id: string) {
        htmless.inlineComponents[id] = this;
        return this;
    }
    label(l: string) {
        htmless.labelComponent(this, l);
        return this;
    }
}

let inlineComponent = htmless.inlineComponent.bind(htmless);