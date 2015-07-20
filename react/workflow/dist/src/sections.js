var Sections = React.createClass({displayName: "Sections",



    render: function(){
        return(
        React.createElement("div", null,

                this.props.items.map(function(item) {
                    var insideHTML;
                    if(item.code === null)
                        insideHTML =  (React.createElement("div", null, React.createElement(Instruction, {heading: item.heading, content: item.instruction})))
                    else
                        insideHTML =  (
                            React.createElement("div", null,
                                React.createElement(Instruction, {heading: item.heading, content: item.instruction}),
                                React.createElement(Snippet, {language: item.code.language, content: item.code.content})
                            )
                        )

                    if(item.items.length == 0)
                        return React.createElement("div", null, insideHTML)
                    else
                        return React.createElement("div", null,
                        insideHTML,
                        React.createElement(Sections, {items: item.items})
                        )
                })

        )
        )
    }

});


