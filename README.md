## This project has been replaced by [H.js](https://github.com/iahuang/hjs) and this repository will no longer be maintained.

# htmless

Write HTML code without writing HTML code. The integration with Javascript allowes for a much tighter relationship between your code and your UI, which is important in modern webapps. Technologies like React's JSX syntax exist, although these require the use of extra toolchains such as babel.

HTMLess is centered around keeping a feel similar to that is familiar in HTML syntax while also taking advantage of a proper scripting-language environment.

## Basic Example

```js
let page = div(
    headers.h1("Header"),
    "lorem ipsum etc etc",
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
        document.getElementById("comment").value = ""; // clear the input field afterwards
    })
);

document.body.appendChild(app.render());
```

![screenshot](https://raw.githubusercontent.com/iahuang/htmless/master/example/screenshots/step1a.png)

### Components

At this point, we still haven't made our page interactive. In HTMLess, we define dynamic UI elements through things called Components. If you've used React, this concept should be familiar. If not, a component can be thought of a piece of state data that can also be rendered as a UI element.

By this reasoning, we can think of our comments as a Component, because they both have an appearance in our UI that is determined by their state (comment text and number of likes).

Here's an example of how to create a component in the context of our comment example

```js
class Comment extends Component {
    constructor(commentText, likes) {
        super();
        this.likes = likes;
        this.commentText = commentText;
    }

    body() {
        return div(
            span(
                this.likes + " likes",
                button("Like")
                    .onClick(() => {
                        // ...
                    })
                    .class("comment-button"),
                button("Delete")
                    .onClick(() => {
                        // ...
                    })
                    .class("comment-button")
            ).class("comment-header"),
            newline,
            this.commentText
        ).class("comment");
    }
}
```

`Component.body` defines what the component should look like on render, while the object itself is also data container for our comment.

It will look something like this when rendered:

![screenshot](https://raw.githubusercontent.com/iahuang/htmless/master/example/screenshots/step2.png)

Keep in mind the external styling that is defined in our HTML file and not included in our JS code.

Because we want our Components to serve as not only a UI definition but also a data source, our `comments` variable should contain Component instances as opposed to raw data. Let's modify our code accordingly.

```js
let comments = [];

class Comment extends Component {
    // ...
}

let app = div(
    div(headers.h1("Example app"), headers.h2("Comments:").italicized()),
    new Comment("sfdakljfadkjdfa lsdajl; sadfjfsad", 0), // dummy comment for testing purposes
    input.text()
        .maxlength(100)
        .placeholder("Your comment")
        .id("comment"),
    button("Post").onClick(() => {
        let commentText = document.getElementById("comment").value;
        comments.push(new Comment(commentText, 0)); // push a Comment instance to our comments variable
        document.getElementById("comment").value = "";
    })
);

document.body.appendChild(app.render());
```

### `htmless` instance

Components are managed through a HTMLess instance (`window.htmless`) which serves as the *context* for your application. One of the core features of components is that they are dynamic, which means they can be rerendered as needed, or in particular, when their data changes. The htmless instance is responsible for keeping track of the relationship between your components and the DOM tree, and is what allows us to do this.

Notice how our comment box has a like button that, in the previous code snippets, didn't actually do anything. If we modify our Comment component code to increment its like counter like so

```js
class Comment extends Component {
    constructor(commentText, likes) {
        super();
        this.likes = likes;
        this.commentText = commentText;
    }

    body() {
        return div(
            span(
                this.likes + " likes",
                button("Like")
                    .onClick(() => {
                        this.likes += 1; // <<<< the button actually does something now look
                    })
                    .class("comment-button"),
                button("Delete")
                    .onClick(() => {
                        // ...
                    })
                    .class("comment-button")
            ).class("comment-header"),
            newline,
            this.commentText
        ).class("comment");
    }
}
```

You would notice (if you were to run the app), that the button still doesn't actually do anything. Why is that? We've updated the data driving the UI element but we haven't actually updated the UI element itself. This is where the `htmless` instance comes in. One of its most important methods is `htmless.rerender(component)`. When you call it, the HTML elements associated with the component passed to it, or in other words, the component itself, is redrawn, reflecting any changes in the DOM tree. Let's tell our button to `rerender` its parent Comment object when it's clicked.

```js
button("Like")
    .onClick(() => {
        this.likes += 1;
        htmless.rerender(this);
    })
```

Now, if you were to run the app, the number of likes should update properly when you click the "like" button. You may notice that the "delete" button still doesn't do anything. We'll get to that later.

We also still haven't actually rendered our list of comments. Because the list changes as our comments variable changes, our comments list is a dynamic UI element, and therefore should also be a component.

```js
class CommentsList extends Component {
    constructor() {
        super();
        this.comments = [];
    }
    body() {
        return div(this.comments); // Returning an array of Components (or any other renderable type) will render all of them sequentially as expected
    }
}

let comments = new CommentsList();
```

This is a lot of boilerplate code. That's why HTMLess has a feature called inline components.

### Inline Components

```js
let comments = [];

htmless.inlineComponent(() => {
    return div(comments);
}, "comment-list")
```

Inline components are created through the htmless instance, and take two arguments. The first is a function that returns the component body, and the second is the component identifier. This is important because, as you might expect, inline components are declared within a larger expression and thus have no other way of being referenced later on.

You can refer to an inline component using `htmless.getInlineComponent(id)`, which will return the component in question.

Here's the body of our app now:

```js
let comments = [];

let app = div(
    div(headers.h1("Example app"), headers.h2("Comments:").italicized()),
    // Our new inline comment list component
    htmless.inlineComponent(() => {
        return div(comments);
    }, "comment-list"),
    input.text()
        .maxlength(100)
        .placeholder("Your comment")
        .id("comment"),
    button("Post").onClick(() => {
        let commentText = document.getElementById("comment").value;
        comments.push(new Comment(commentText, 0));
        htmless.rerender("comment-list"); // Update the list component
        document.getElementById("comment").value = "";
    })
);
```

Note the line `htmless.rerender("comment-list");`. For convenience, if a string is passed to `rerender` instead of a component object, it will assume the argument to be a component identifier instead.

Lastly let's write the code for our "delete comment" button since we haven't done that yet

```js
button("Delete")
    .onClick(() => {
        comments = comments.filter(item => item !== this); // remove this comment component from the list of comments
        htmless.rerender("comment-list");
    })
    .class("comment-button")
```

### Putting it all together

```js
let comments = [];

class Comment extends Component {
    constructor(commentText, likes) {
        super();
        this.likes = likes;
        this.commentText = commentText;
    }

    body() {
        return div(
            span(
                this.likes + " likes",
                button("Like")
                    .onClick(() => {
                        this.likes++;
                        htmless.rerender(this);
                    })
                    .class("comment-button"),
                button("Delete")
                    .onClick(() => {
                        comments = comments.filter(item => item !== this);
                        htmless.rerender("comment-list");
                    })
                    .class("comment-button")
            ).class("comment-header"),
            newline,
            this.commentText
        ).class("comment");
    }
}

let app = div(
    div(headers.h1("Example app"), headers.h2("Comments:").italicized()),
    htmless.inlineComponent(() => {
        return div(comments);
    }, "comment-list"),
    input.text()
        .maxlength(100)
        .placeholder("Your comment")
        .id("comment"),
    button("Post").onClick(() => {
        let commentText = document.getElementById("comment").value;
        comments.push(new Comment(commentText, 0));
        htmless.rerender("comment-list");
        document.getElementById("comment").value = "";
    })
);

document.body.appendChild(app.render());
```
