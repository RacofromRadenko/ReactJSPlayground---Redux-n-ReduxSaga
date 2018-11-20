import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.less';

class Header extends Component {
	state = {
		showTournament: true
	};

	render() {
		return (
			<div className="container">
				<div className="Header">
					<Link to="/">Home</Link>
					<Link to="/tournaments">Tournaments</Link>
					<Link to="/gn-projects">GN Projects</Link>
					<Link to="/gs-share">GS Share</Link>
				</div>
			</div>
		);
	}
}

export default Header;
