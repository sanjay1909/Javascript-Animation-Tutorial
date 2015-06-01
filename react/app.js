var HelloUser = React.createClass({displayName: "HelloUser",
  render: function(){
    return (
      React.createElement("div", null, " Hello, ", this.props.name)
    )
  }
});

React.render(React.createElement(HelloUser, {name: "Sanjay"}), document.getElementById('app'));

