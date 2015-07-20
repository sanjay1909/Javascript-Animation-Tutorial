var Snippet = React.createClass({displayName: "Snippet",
    getDefaultProps: function () {
        return {
            language: "javascript",
            content:""
        }
    },
    render: function () {

        return (  React.createElement("pre", {className: "prettyprint linenums"},
            React.createElement("code", {className: this.props.language},
                this.props.content
            )
            )
                )
        }
});


