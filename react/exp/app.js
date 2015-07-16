
// ln mapped linkNum for reacts state
var ln = new weavecore.LinkableNumber(5);


// Component
var Counter = React.createClass({displayName: "Counter",


  incrementCount: function(){
    ln.value = ln.value + 1;
  },
  getInitialState: function(){
    return {linkNum: ln.getSessionState()};
  },

  componentDidMount: function() {
    ln.addImmediateCallback({},this._onChange);
  },

  // Unbind change listener
  componentWillUnmount: function() {
    ln.removeCallback({},this._onChange);
  },

  // Update view state when change event is received
  _onChange: function() {
  this.setState({linkNum:ln.getSessionState()});
  },

  render: function(){
    return (
      React.createElement("div", null,
      React.createElement("h2", null, this.props.display, ": ", ln.value),
        React.createElement("button", {type: "button", onClick: this.incrementCount}, "Increment")
      )
    );
  }
});

var counterInstance = React.createElement(Counter, {display: "counter:"});

React.render(counterInstance, document.getElementById('reactApp'));
