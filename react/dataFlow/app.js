/** @jsx React.DOM */

var FilteredList = React.createClass({
    displayName: "FilteredList",
    filterList: function (event) {
        var updatedList = this.state.initialItems;
        updatedList = updatedList.filter(function (item) {
            return item.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({
            items: updatedList
        });
    },
    getInitialState: function () {
        return {
            initialItems: [
         "Apples",
         "Broccoli",
         "Chicken",
         "Duck",
         "Eggs",
         "Fish",
         "Granola",
         "Cereal"
       ],
            items: []
        }
    },
    componentWillMount: function () {
        this.setState({
            items: this.state.initialItems
        })
    },
    render: function () {
        return (
            React.createElement("div", {
                    className: "filter-list"
                },
                React.createElement("br", null),
                React.createElement("input", {
                    type: "text",
                    placeholder: "Search",
                    onChange: this.filterList
                }),
                React.createElement(List, {
                    items: this.state.items
                })
            )
        );
    }
});

var List = React.createClass({
    displayName: "List",
    render: function () {
        return (
            React.createElement("ul", null,

                this.props.items.map(function (item) {
                    return React.createElement("li", {
                        key: item
                    }, item)
                })

            )
        )
    }
});

React.render(React.createElement(FilteredList, null), document.getElementById('reactDiv'));
React.render(React.createElement(FilteredList, null), document.getElementById('reactDiv2'));


this.SummaryAnnotation = function (state, summaryName) {

    var toolName = summaryName || ws.generateUniqueName("SummaryBox");

    if (!ws.checkWeaveReady()) {

        ws.setWeaveWindow(window);

        return;

    }

    if (state && state.enabled) { //when auto-generation checked
        if (state.generated) { //content generation enabled
            //if data-source exists - contents come from WeaveAnalystDataSource
            if (ws.weave.path("WeaveAnalystDataSource").getType()) {
                var script;
                var inputs;
                var inputString = "Inputs : ";
                script = "Script : " + ws.weave.path("WeaveAnalystDataSource").push('scriptName').getState();
                inputs = ws.weave.path("WeaveAnalystDataSource").push("inputs").getNames();

                for (var i = 0; i < inputs.length; i++) {
                    inputString += inputs[i] + " , ";
                }

                if (i == inputs.length)
                    inputString = inputString.substr(0, inputString.lastIndexOf(','));

                state.content = script + "\n" + inputString;
                ws.weave.path(toolName).request("SessionedTextBox").push("htmlText").state(state.content);

            } else { //when no data-source: contents come from UI inputs
                ws.weave.path(toolName).request("SessionedTextBox").push("htmlText").state(state.content);
            }

        } else {
            ws.weave.path(toolName).request("SessionedTextBox").push("htmlText").state(state.content);
        }
    } else {
        ws.weave.path(toolName).remove();
    }



};
