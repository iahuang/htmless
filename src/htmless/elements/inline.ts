class InlineHTMLElement {
    content: string;
    // Represents HTML code as a string literal
    constructor(content: string) {
        this.content = content;
    }
    render() {
        var tpl = document.createElement("template");
        tpl.innerHTML = this.content;
        return tpl.content;
    }
}