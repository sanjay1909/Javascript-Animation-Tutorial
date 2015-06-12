var Counter = React.createClass({
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
      <div class="my-component">
        <h2>Count: {this.state.count}</h2>
        <button type="button" onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
});

React.render(<Counter/>, document.getElementById('reactDiv'));
