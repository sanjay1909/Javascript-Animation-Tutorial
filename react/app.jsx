var HelloUser = React.createClass({
//getInitialState method is “The way in which you set the state of a component”.
// In other terms, getInitialState returns an object which contains the state or data for our component.
  getInitialState: function(){
    return {
      username: '@sanjay1909'
    }
  },
  handleChange: function(e){
  // whenever setState is called, React creates a new virtual DOM, does the diff, then updates the real DOM.
    this.setState({
      username: e.target.value
    });
  },
  render: function(){
     return (
      <div>
        Hello {this.state.username} <br />
        //onChange is a React thing and it will call whatever method you specify every time the value in the input box changes,
        Change Name: <input type="text" value={this.state.username} onChange={this.handleChange} />
      </div>
    )
  }
});

React.render(<HelloUser/> , document.getElementById('app'));
