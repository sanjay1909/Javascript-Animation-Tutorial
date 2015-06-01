var HelloUser = React.createClass({
//getInitialState method is “The way in which you set the state of a component”.
// In other terms, getInitialState returns an object which contains the state or data for our component.
  getInitialState: function(){
    return {
      username: '@sanjay1909'
    }
  },
  render: function(){
    return (
      <div>
        Hello {this.state.username}
      </div>
    )
  }
});

React.render(<HelloUser/> , document.getElementById('app'));
