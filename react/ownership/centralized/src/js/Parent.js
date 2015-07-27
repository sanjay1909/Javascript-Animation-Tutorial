var Post = require('./Post');
var Editor = require('./Editor');
var React = require("react");
var Parent = React.createClass({
    getInitialState: function () {
        return {
            content: "<p>Hi it's a trail<p>",
            editing: false
        };
    },

    render: function () {
        return ( < div className = "post" >
            < Post hidden = {
                this.state.editing
            }
            content = {
                this.state.content
            }
            onClick = {
                this.switchToEditor
            }
            />

            < Editor hidden = {
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

    // triggered when we click the post
    switchToEditor: function () {
        console.log("switch to editor");
        this.setState({
            editing: true
        });
    },

    // Called by the editor component
    onUpdate: function (evt) {
        this.setState({
            content: evt.target.getContent(),
            editing: false
        });
    }
});

module.exports = Parent;
