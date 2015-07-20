var Snippet = React.createClass({
    getDefaultProps: function () {
        return {
            language: "javascript",
            content:""
        }
    },
    render: function () {

        return (  <pre className='prettyprint linenums'>
            <code className ={this.props.language}>
                {this.props.content}
            </code>
            </pre>
                )
        }
});


