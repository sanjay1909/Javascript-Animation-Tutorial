var Post = require('./Post');
var Editor = require('./Editor');
var React = require("react");
var Parent = React.createClass({
    getInitialState: function () {
        return {
            content: "Hi it's a trail",
            editing: true
        };
    },

    render: function () {
        console.log('rendering', this.state.editing);
        return ( < div className = "post" >
            < Post ref = "post"
            hidden = {
                this.state.editing
            }
            content = {
                this.state.content
            }
            onClick = {
                this.switchToEditor
            }
            />

            < Editor ref = "editor"
            hidden = {
                !this.state.editing
            }
            content = {
                this.state.content
            }
            onUpdate = {
                this.onUpdate
            }
            />

            < /div >
        );
    },

    /*
     * linking the Post to the Editor
     * directly in the function handlers:
     */
    // triggered when we click the post
    switchToEditor: function () {
        console.log('editor called');
        this.refs.editor.setContent(this.refs.post.getContent());
        this.setState({
            editing: true
        });
    },

    // Called by the editor component
    onUpdate: function (evt) {
        var newContent = evt.target.getContent();
        this.setState({
            editing: false
        }, function () {
            this.refs.post.setContent(newContent);
        });
    }
});

module.exports = Parent;

/*This might seem better, but we've certainly not made the code easier to read by putting in all those async interruptions...*/
