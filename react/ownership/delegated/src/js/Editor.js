var React = require("react");
var TinyMCE = require("react-tinymce");
console.log(TinyMCE);
var Editor = React.createClass({

    getInitialState: function () {
        return {
            content: "<p>Hi it's a trail Deleagted approach<p>"
        };
    },
    setContent: function (newContent, callback) {
        console.log(newContent)
        this.setState({
            content: newContent
        });
    },
    render: function () {

        return <div className = {
            this.props.hidden ? 'hidden' : ''
        } > < TinyMCE
        content = {
            this.state.content
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
