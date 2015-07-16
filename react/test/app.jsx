var About = React.createClass({
	render: function() {
		return (
			<h1>This is a routing demo About!</h1>
		);
	}
});

var UsersModule = React.createClass({
	render: function() {
		return (
			<h1>This is a routing demo Users!</h1>
		);
	}
});

var ClientsModule = React.createClass({
	render: function() {
		return (
			<h1>This is a client list!</h1>
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



var App = React.createClass({

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
					<li className={menuUrl === currentUrl ? "active": ""} key={m.url}>
						<a href={'#' + href}>{m.name}</a>
					</li>
				);
            });

			return (
				<nav className="navbar navbar-default navbar-top" role="navigation">
					<ul className="nav navbar-nav">{mm}</ul>
				</nav>
			);
		},

	render: function() {



		var menuHtml = this.createMenu(this.state.menu);
		return (
			<div>
				{menuHtml}
				<div className="container">
					<Path name="users" render={UsersModule}/>
					<Path name="clients" render={ClientsModule}/>
					<Path name="about" render={About}/>
				</div>
			</div>
		);
	}
});

React.render( <App/> , document.getElementById('example'));

