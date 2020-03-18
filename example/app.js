let context = new HLContext();

let comments = [];

class Comment extends Component {
    constructor(commentText, likes) {
        super();
        this.likes = likes;
        this.commentText = commentText;
    }

    body(context) {
        return div(
            span(
                this.likes + " likes",
                button("Like")
                    .onClick(() => {
                        this.likes++;
                        context.rerender(this);
                    })
                    .class("comment-button"),
                button("Delete")
                    .onClick(() => {
                        comments = comments.filter(item => item !== this);
                        context.rerender("comment-list");
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
    context.inlineComponent(() => {
        return div(comments);
    }, "comment-list"),
    input.text()
        .maxlength(100)
        .placeholder("Your comment")
        .id("comment"),
    button("Post").onClick(() => {
        let commentText = document.getElementById("comment").value;
        comments.push(new Comment(commentText, 0));
        context.rerender("comment-list");
        document.getElementById("comment").value = "";
    })
);

document.body.appendChild(app.render(context));
