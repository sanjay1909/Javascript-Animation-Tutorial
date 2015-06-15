var Counter = React.createClass({displayName: "Counter",
    getInitialState: function(){
        return {
            count: 5
        }
    },
    render: function(){
        return (
            React.createElement("h1", null, this.state.count)
        )
    }
});

React.render(React.createElement(Counter, null), document.getElementById('reactDiv'));
