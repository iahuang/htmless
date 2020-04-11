/* HTMLess - a lightweight Javascript library for writing UI elements in JS */

/// <reference path="htmless/core.ts" />

function elementFunction(tagName: string, type = HLElement) {
    return (...children: any[]) => {
        return new type(tagName, children);
    };
}

// Misc

let inlineHTML = function (html: string) {
    return new InlineHTMLElement(html);
};

// Organization

let div = elementFunction("div");
let span = elementFunction("span");
let hr = new HLElement("hr");

// Text

let paragraph = elementFunction("p");


let hyperlink = function (...children: any[]) {
    return new HLHyperlinkElement("a", children);
}

let headers = {
    h1: elementFunction("h1"),
    h2: elementFunction("h2"),
    h3: elementFunction("h3"),
    h4: elementFunction("h4"),
    h5: elementFunction("h5"),
    h6: elementFunction("h6"),
};

let newline = new HLElement("br");

let smallText = elementFunction("small");
let superscript = elementFunction("sup");
let subscript = elementFunction("sub");

let codeBlock = elementFunction("code");

// Media

let image = function (src: string) {
    return new HLImageElement(src)
};


let video = function () {
    return new HLVideoElement();
}

// Form

let button = elementFunction("button");

// text fields

// date / time

// other

let input = {
    // text fields
    text: () => {
        return new HLTextField("text");
    },
    numeric: () => {
        return new HLTextField("number");
    },
    email: () => {
        return new HLTextField("email");
    },
    password: () => {
        return new HLTextField("password");
    },
    search: () => {
        return new HLTextField("search");
    },
    phoneNumber: () => {
        return new HLTextField("tel");
    },
    url: () => {
        return new HLTextField("url");
    },
    // buttons
    checkbox: () => {
        return new HLInputElement("checkbox");
    },
    radio: () => {
        return new HLInputElement("radio");
    },
    // date/time
    date: () => {
        return new HLInputElement("date");
    },
    datetimeLocal: () => {
        return new HLInputElement("datetime-local");
    },
    month: () => {
        return new HLInputElement("month");
    },
    week: () => {
        return new HLInputElement("week");
    },
    // other
    file: () => {
        return new HLFileUpload();
    },
    color: () => {
        return new HLInputElement("color");
    },
};

// Misc

let htmless = new HTMLess();
