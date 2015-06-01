var HelloUser = React.createClass({displayName: "HelloUser",
//getInitialState method is “The way in which you set the state of a component”.
// In other terms, getInitialState returns an object which contains the state or data for our component.
  getInitialState: function(){
    return {
      username: '@sanjay1909'
    }
  },
  handleChange: function(e){
    this.setState({
      username: e.target.value
    });
  },
  render: function(){
     return (
      React.createElement("div", null,
        "Hello ", this.state.username, " ", React.createElement("br", null),
        "Change Name: ", React.createElement("input", {type: "text", value: this.state.username, onChange: this.handleChange})
      )
    )
  }
});

React.render(React.createElement(HelloUser, null) , document.getElementById('app'));
