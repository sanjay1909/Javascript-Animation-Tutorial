
// ln mapped linkNum for reacts state
var ln = new weavecore.LinkableNumber(5);


// Component
var Counter = React.createClass({


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
      <div>
      <h2>{this.props.display}: {ln.value}</h2>
        <button type="button" onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
});

var counterInstance = <Counter display="counter:"/>;

React.render(counterInstance, document.getElementById('reactApp'));
