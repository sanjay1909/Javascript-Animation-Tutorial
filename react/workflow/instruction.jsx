var Instruction = React.createClass({
    getDefaultProps: function () {
        return {
            heading: "Tile",
            content:"Content"
        }
    },
    render: function () {

        return (
                    <div>
                        <h2>{this.props.heading}</h2>
                        <p>{this.props.content}</p>
                    </div>
            );
        }
});


