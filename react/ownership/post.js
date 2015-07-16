var marked = require("marked");
var Post = React.createClass({
    render: function () {
        var innerHTML = {
            dangerouslySetInnerHTML: {
                __html: marked(this.props.content)
            }
        };
        return <div {...innerHTML
        }
        />;
    }
});
