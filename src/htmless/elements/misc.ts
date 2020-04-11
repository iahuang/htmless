class HLHyperlinkElement extends HLElement {
    href(dest: string) {
        return this.setAttr("href", dest);
    }
    download(value: string) {
        return this.setAttr("download", value);
    }
    target(where: string) {
        return this.setAttr("target", where);
    }
}