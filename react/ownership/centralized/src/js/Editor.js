var React = require("react");
var TinyMCE = require("react-tinymce");
console.log(TinyMCE);
var Editor = React.createClass({
    render: function () {

        return <div className = {
            this.props.hidden ? 'hidden' : ''
        } > < TinyMCE
        content = {
            this.props.content
        }
        config = {
            {
                plugins: 'autolink link image lists print preview',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
            }
        }
        onChange = {
            this.onUpdate
        }
        />

        < /div > ;
    },
    onUpdate: function (evt) {
        this.props.onUpdate(evt);
    }
});


module.exports = Editor;
