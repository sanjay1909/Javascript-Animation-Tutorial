//In the delegated approach, each component controls what it controls. No more, no less, and this changes things a little.

var marked = require("marked");
var React = require("react");
var Post = React.createClass({
    /* it now controls the content, and as such,
     * it has state and it has an API function for updating the content
     * if a user makes an edit (somehow) outside of the Post
     */
    getInitialState: function () {
        return {
            content: "<p>Hi it's a trail Deleagted approach<p>"
        };
    },

    setContent: function (newContent) {
        console.log(newContent)
        this.setState({
            content: newContent
        });
    },

    getContent: function () {
        console.log(this.state.content);
        return this.state.content;
    },

    render: function () {
        var innerHTML = {
            dangerouslySetInnerHTML: {
                __html: marked(this.state.content)
            }
        };
        return <div className = {
            this.props.hidden ? 'hidden' : ''
        }

        onClick = {
            this.props.onClick
        }

        {...innerHTML
        }
        />;
    }
});

module.exports = Post;
