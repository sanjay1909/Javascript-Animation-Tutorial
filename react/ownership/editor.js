var tinyme = require("tinymce");
var Editor = React.createClass({
    render: function () {
        var innerHTML = {
            dangerouslySetInnerHTML: {
                __html: tinymce({
                    content: this.props.content,
                    updateHandler: this.onUpdate
                })
            }
        };
        return <div {...innerHTML
        }
        />;
    },
    onUpdate: function (evt) {
        this.props.onUpdate(evt);
    }
});
