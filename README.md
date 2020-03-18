# htmless

Write HTML code without writing HTML code. The integration with Javascript allowes for a much tighter relationship between your code and your UI, which is important in modern webapps. Technologies like React's JSX syntax exist, although these require the use of extra toolchains such as babel.

HTMLess is centered around keeping a feel similar to that is familiar in HTML syntax while also taking advantage of a proper scripting-language environment.

## Basic formatting Example

```js
let page = div(
    headers.h1("Header),
    paragraph("lorem ipsum etc etc"),
    hyperlink("google")
        .href("http://google.com")
        .italicized() // equivalent to <em><a href="..."> ... </a><em>
).class("my-class");

document.body.appendChild(page.render()); // apply to the DOM
```

## Simple app tutorial

This tutorial will cover the steps to make this simple "comments section" app. The full code for this example can be found in the `example/` folder of this repository.

![screenshot](https://raw.githubusercontent.com/iahuang/htmless/master/example/screenshots/result.png)

### Setup

Let's start by throwing together a basic HTML page for this app. In the header, we'll link a copy of HTMLess as a minified/production js file, some simple styling, and a link to our code, contained in a file called `app.js`.

```html
<html>
    <head>
        <script src="htmless.min.js"></script>
        <style>
            body {
                font-family: Sans-Serif;
            }
            .comment {
                background-color: #cccccc;
                padding: 10px;
                border-radius: 10px;
                margin-top: 10px;
                margin-bottom: 10px;
            }
            .comment-header {
                color: #555555;
                font-size: small;
            }
            .comment-button {
                margin-left: 10px;
            }
        </style>
    </head>
    <body>
        <script src="app.js"></script>
    </body>
</html>
```

Now here's some boilerplate code for `app.js`:

```js
let app = div(
    div(headers.h1("Example app"), headers.h2("Comments:").italicized())
)
document.body.appendChild(app.render());
```

Which will produce this result:

![screenshot](https://raw.githubusercontent.com/iahuang/htmless/master/example/screenshots/step1.png)