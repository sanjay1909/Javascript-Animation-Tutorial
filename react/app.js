//parent component
var FriendsContainer = React.createClass({displayName: "FriendsContainer",
  getInitialState: function(){
    return {
      name: 'Sanjay',
      friends: ['Krishna', 'Vignesh', 'Raj']
    }
  },
  addFriend: function(friend){
    this.setState({
      friends: this.state.friends.concat([friend])
    });
  },
  render: function(){
    return (
      React.createElement("div", null,
        React.createElement("h3", null, " Name: ", this.state.name, " "),
        React.createElement(AddFriend, {addNew: this.addFriend}),
        React.createElement(ShowList, {names: this.state.friends})
      )
    )
  }
});

var AddFriend = React.createClass({displayName: "AddFriend",
  getInitialState: function(){
    return {
      newFriend: ''
    }
  },
  updateNewFriend: function(e){
    this.setState({
      newFriend: e.target.value
    });
  },
  handleAddNew: function(){
    this.props.addNew(this.state.newFriend);
    this.setState({
      newFriend: ''
    });
  },
  render: function(){
    return (
        React.createElement("div", null,
          React.createElement("input", {type: "text", value: this.state.newFriend, onChange: this.updateNewFriend}),
          React.createElement("button", {onClick: this.handleAddNew}, " Add Friend ")
        )
    );
  }
});

// child component
// props.names is got from UI attribute to Component
var ShowList = React.createClass({displayName: "ShowList",
  render: function(){
    var listItems = this.props.names.map(function(friend){
      return React.createElement("li", null, " ", friend, " ");
    });
    return (
      React.createElement("div", null,
        React.createElement("h3", null, " Friends "),
        React.createElement("ul", null,
          listItems
        )
      )
    )
  }
});

React.render(React.createElement(FriendsContainer, null), document.getElementById('app'));

