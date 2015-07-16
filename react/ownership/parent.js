var Parent = React.createClass({
            getInitialState: function () {
                return {
                    content: "",
                    editing: false
                };
            },

            render: function () {
                return ( < div className = "post" >
                        < Post hidden = {
                            this.state.editing
                        }
                        content = {
                            this.state.content
                        }
                        onClick = {
                            this.switchToEditor
                        }
                        /> < Editor hidden = {
                            !this.state.editing
                        }
                        content = {
                            this.state.content
                        }
                        onUpdate = {
                            this.onUpdate
                        }
                        /> < /div>);
                    },

                    // triggered when we click the post
                    switchToEditor: function () {
                        this.setState({
                            editing: true
                        });
                    },

                    // Called by the editor component
                    onUpdate: function (evt) {
                        this.setState({
                            content: evt.updatedContent,
                            editing: false
                        });
                    }
            });
