var Sections = React.createClass({



    render: function(){
        return(
        <div>
            {
                this.props.items.map(function(item) {
                    var insideHTML;
                    if(item.code === null)
                        insideHTML =  (<div><Instruction heading={item.heading} content={item.instruction}/></div>)
                    else
                        insideHTML =  (
                            <div>
                                <Instruction heading={item.heading} content={item.instruction}/>
                                <Snippet language={item.code.language} content={item.code.content}/>
                            </div>
                        )

                    if(item.items.length == 0)
                        return <div>{insideHTML}</div>
                    else
                        return <div>
                        {insideHTML}
                        <Sections items={item.items}/>
                        </div>
                })
            }
        </div>
        )
    }

});


