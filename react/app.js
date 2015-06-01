var HelloUser = React.createClass({displayName: "HelloUser",
//getInitialState method is “The way in which you set the state of a component”.
// In other terms, getInitialState returns an object which contains the state or data for our component.
  getInitialState: function(){
    return {
      username: '@sanjay1909'
    }
  },
  render: function(){
    return (
      React.createElement("div", null,
        "Hello ", this.state.username
      )
    )
  }
});

React.render(React.createElement(HelloUser, null) , document.getElementById('app'));
