//parent component
var FriendsContainer = React.createClass({
  getInitialState: function(){
    return {
      name: 'Sanjay',
      friends: ['Krishna', 'Vignesh', 'Raj']
    }
  },
  render: function(){
    return (
      <div>
        <h3> Name: {this.state.name} </h3>
        <ShowList names={this.state.friends} />
      </div>
    )
  }
});

//child component
// props.names is got from UI attribute to Component
var ShowList = React.createClass({
  render: function(){
    var listItems = this.props.names.map(function(friend){
      return <li> {friend} </li>;
    });
    return (
      <div>
        <h3> Friends </h3>
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
});

React.render(<FriendsContainer/>, document.getElementById('app'));

