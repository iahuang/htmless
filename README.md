# htmless

Write HTML code without writing HTML code. The integration with Javascript allowes for a much tighter relationship between your code and your UI, which is important in modern webapps. Technologies like React's JSX syntax exist, although these require the use of extra toolchains such as babel.

HTMLess is centered around keeping a feel similar to that is familiar in HTML syntax while also taking advantage of a proper scripting-language environment.

## Basic Example

```js
let page = div(
    headers.h1("Header"),
    // longhand for <p>
    paragraph("lorem ipsum etc etc"),
    // equivalent to <em><a href="..."> ... </a><em>
    hyperlink("google")
        .href("http://google.com")
        .italicized() // note how modifying functions can be chained
)
    .class("my-class")
    .class("another-class"); // can be used multiple times to add as many classes as you want

document.body.appendChild(page.render()); // apply to the DOM
```

## Simple app tutorial

This tutorial will cover the steps to make this simple "comments section" app. The full code for this example can be found in the `example/` folder of this repository.

![screenshot](https://raw.githubusercontent.com/iahuang/htmless/master/example/screenshots/result.png)

### Setup

Let's start by throwing together a basic HTML page for this app. In the header, we'll link a production copy of HTMLess (which you can find in this repository's `dist/` folder), some simple styling, and a link to our code, contained in a file called `app.js`.

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

Not gonna lie, that's pretty boring.

### Form elements

Let's add some clicky things to our webpage. Input elements (`<input>`) such as text fields are found in the global `input` variable. Here's an example for a text field that we will use for our comment text field.

```js
input.text() // equivalent to <input type="text">
```

Pretty simple. Let's note some things about this comment box:

- We should have some sort of hint to indicate the purpose of this element
- The comment box should have some sort of character limit (which ideally should also be validaded server side)
- It should have an `id` tag so we can refer to it later.

With these things in mind, this is what our input field looks like now:

```js
input.text()
    .maxlength(100)
    .placeholder("Your comment")
    .id("comment")
```

Note how in this case each modifier returns the resulting element, i.e., element modifiers are function-chainable.

Let's also make a button for posting the comment.

```js
button("Post").onEvent("click", () => {

});
```

You can think of `onEvent` as an equivalent to `addEventListener()`. For convenience, HTMLess also provides a method `onClick` which behaves in the same way as the code above.

```js
button("Post").onClick(() => {

});
```

We should also make the button do something. Let's add a variable called `comments` that stores our comments and have the button add the text from our input field to this variable.

At this point, the app looks something like this:

```js
let app = div(
    div(headers.h1("Example app"), headers.h2("Comments:").italicized()),
    input.text()
        .maxlength(100)
        .placeholder("Your comment")
        .id("comment"),
    button("Post").onClick(() => {
        let commentText = document.getElementById("comment").value; // get the content of our input field
        comments.push(commentText);
        context.rerender("comment-list");
        document.getElementById("comment").value = ""; // clear the input field afterwards
    })
);

document.body.appendChild(app.render());
```

### The Component / HLContext API

At this point, we still haven't made our page interactive.