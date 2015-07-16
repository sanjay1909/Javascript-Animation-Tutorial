var About = React.createClass({displayName: "About",
	render: function() {
		return (
			React.createElement("h1", null, "This is a routing demo About!")
		);
	}
});

var UsersModule = React.createClass({displayName: "UsersModule",
	render: function() {
		return (
			React.createElement("h1", null, "This is a routing demo Users!")
		);
	}
});

var ClientsModule = React.createClass({displayName: "ClientsModule",
	render: function() {
		return (
			React.createElement("h1", null, "This is a client list!")
		);
	}
});

function combine(url, path) {
		var url = url || '';
		var path = path || '';

		url = url.trim();
		path = path.trim();

		if (path === '')
			return '';

		var href = '';

		if (url.length > 0) {
			if (url[0] !== '/')
				href += '/';
			if (url[url.length - 1] === '/')
				url = url.substr(0, url.length - 1);

			href += url;
		}

		if (path.length > 0) {
			if (path[0] !== '/')
				href += '/';
			if (path[path.length - 1] === '/')
				path = path.substr(0, path.length - 1);

			href += path;
		}
		return href;
	};



var App = React.createClass({displayName: "App",

   getInitialState: function(){
   return {
            menu : [
                        {
                            url: 'users',
                            name: 'Users'
                        },
                        {
                            url: 'clients',
                            name: 'Clients'
                        },
                        {
                            url: 'about',
                            name: 'About'
                        }
		          ] };
    },



    createMenu: function(menu) {
            var self = this;
            var mm = menu.map(function(m){
                var currentUrl = window.location.hash.substr(1);
				var menuUrl = combine(self.props.parentUrl, m.url);
                var href = combine(self.props.componentUrl, m.url);

				return (
					React.createElement("li", {className: menuUrl === currentUrl ? "active": "", key: m.url},
						React.createElement("a", {href: '#' + href}, m.name)
					)
				);
            });

			return (
				React.createElement("nav", {className: "navbar navbar-default navbar-top", role: "navigation"},
					React.createElement("ul", {className: "nav navbar-nav"}, mm)
				)
			);
		},

	render: function() {



		var menuHtml = this.createMenu(this.state.menu);
		return (
			React.createElement("div", null,
				menuHtml,
				React.createElement("div", {className: "container"},
					React.createElement(Path, {name: "users", render: UsersModule}),
					React.createElement(Path, {name: "clients", render: ClientsModule}),
					React.createElement(Path, {name: "about", render: About})
				)
			)
		);
	}
});

React.render( React.createElement(App, null) , document.getElementById('example'));

