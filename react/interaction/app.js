var Counter = React.createClass({displayName: "Counter",
  incrementCount: function(){
    this.setState({
      count: this.state.count + 1
    });
  },
  getInitialState: function(){
     return {
       count: 0
     }
  },
  render: function(){
    return (
      React.createElement("div", {class: "my-component"},
        React.createElement("h2", null, "Count: ", this.state.count),
        React.createElement("button", {type: "button", onClick: this.incrementCount}, "Increment")
      )
    );
  }
});

React.render(React.createElement(Counter, null), document.getElementById('reactDiv'));
