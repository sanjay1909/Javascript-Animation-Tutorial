var marked = require("marked");
var Post = React.createClass({displayName: "Post",
  render: function() {
    var innerHTML = {
      dangerouslySetInnerHTML: {
        __html: marked(this.props.content)
      }
    };
    return React.createElement("div", React.__spread({},  innerHTML));
  }
});

var marked = require("marked");
var Editor = React.createClass({displayName: "Editor",
  render: function() {
    var innerHTML = {
      dangerouslySetInnerHTML: {
        __html: marked(this.props.content)
      }
    };
    return React.createElement("div", React.__spread({},  innerHTML));
  }
});


/*var tinymce  = require("tinymce");
var Editor = React.createClass({
  render: function() {
    var innerHTML = {
      dangerouslySetInnerHTML: {
        __html: tinymce({
          content: this.props.content,
          updateHandler: this.onUpdate
        })
      }
    };
    return <div {...innerHTML}/>;
  },
  onUpdate: function(evt) {
    this.props.onUpdate(evt);
  }
});*/


var Parent = React.createClass({displayName: "Parent",
  getInitialState: function() {
    return {
      content: "",
      editing: false
    };
  },

  render: function() {
    return (React.createElement("div", {className: "post"},
      React.createElement(Post, {hidden: this.state.editing, content: this.state.content, onClick: this.switchToEditor}),
      React.createElement(Editor, {hidden: !this.state.editing, content: this.state.content, onUpdate: this.onUpdate})
    ));
  },

  // triggered when we click the post
  switchToEditor: function() {
    this.setState({
      editing: true
    });
  },

  // Called by the editor component
  onUpdate: function(evt) {
    this.setState({
      content: evt.updatedContent,
      editing: false
    });
  }
});

React.render( React.createElement(Parent, null) , document.getElementById('app'));
