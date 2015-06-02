//parent component
var FriendsContainer = React.createClass({
    getInitialState: function () {
        return {
            name: 'Sanjay',
            friends: ['Krishna', 'Vignesh', 'Raj']
        }
    },
    addFriend: function (friend) {
        this.setState({
            friends: this.state.friends.concat([friend])
        });
    },
    render: function () {
        return ( <div>
                    <h3> Name: {this.state.name} </h3>
                    <AddFriend addNew = {this.addFriend}/>
                    <ShowList names = {this.state.friends}/>
                </div>
            )
    }
});

//proptype addnew is a function
//props can be considered as attributes of a tag
// state is object public properties.
var AddFriend = React.createClass({
    getInitialState: function () {
        return {
            newFriend: ''
        }
    },
    propTypes: {
        addNew: React.PropTypes.func.isRequired
    },
    updateNewFriend: function (e) {
        this.setState({
            newFriend: e.target.value
        });
    },
    handleAddNew: function () {
        this.props.addNew(this.state.newFriend);
        this.setState({
            newFriend: ''
        });
    },
    render: function () {
        return ( <div>
                    <input type = "text" value = {this.state.newFriend} onChange = {this.updateNewFriend}/>
                    <button onClick = {this.handleAddNew} > Add Friend </button>
                </div>
                );
        }
});

// child component
// props.names is got from UI attribute to Component
var ShowList = React.createClass({
    getDefaultProps: function () {
        return {
            names: []
        }
    },
    render: function () {
        var listItems = this.props.names.map(function (friend) {
            return <li> {friend} </li>;
        });
        return ( <div>
                    <h3> Friends </h3>
                    <ul> {listItems} </ul>
                </div>
                )
        }
});

React.render( <FriendsContainer/> , document.getElementById('app'));
