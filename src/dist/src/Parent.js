var Parent = React.createClass({displayName: "Parent",
    render: function () {
        return ( React.createElement("div", null,
                    React.createElement("div", null, "My am the parent. "),
                    React.createElement(Child, {name: "child"})
                 )
        )
    }
});
