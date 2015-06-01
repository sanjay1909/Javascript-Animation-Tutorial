//Every component is required to have a render method, render is essentially the template for our component.
//React.render takes in 2 arguments.
//The first argument is the component  to render,
//the second argument is the DOM node where we want to render the component.
var HelloWorld = React.createClass({displayName: "HelloWorld",
             render: function () {
                        return  React.createElement("div", null, " Hello World!")
                    }
            });

            React.render( React.createElement(HelloWorld, null) , document.getElementById('app'));
