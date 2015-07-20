var Instruction = React.createClass({displayName: "Instruction",
    getDefaultProps: function () {
        return {
            heading: "Tile",
            content:"Content"
        }
    },
    render: function () {

        return (
                    React.createElement("div", null,
                        React.createElement("h2", null, this.props.heading),
                        React.createElement("p", null, this.props.content)
                    )
            );
        }
});


