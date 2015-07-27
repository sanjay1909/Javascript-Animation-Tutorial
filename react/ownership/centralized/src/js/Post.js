var marked = require("marked");
var React = require("react");
var Post = React.createClass({
    render: function () {
        var innerHTML = {
            dangerouslySetInnerHTML: {
                __html: marked(this.props.content)
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
