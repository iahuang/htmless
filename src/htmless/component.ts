class Component {
    body(): HLElement {
        throw new Error("No render method specified for this component");
    }
    render() {
        return htmless.renderComponent(this);
    }
}

class InlineComponent extends Component {
    id: string;
    constructor(id: string) {
        super();
        this.id = id;
    }
    label(l: string) {
        htmless.labelComponent(this, l);
        return this;
    }
}

