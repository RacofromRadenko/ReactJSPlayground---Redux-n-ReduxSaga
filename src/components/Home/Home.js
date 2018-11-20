import React, { Component } from 'react';
import './Home.less';
import { withRouter } from 'react-router-dom';
class Home extends Component {
	componentDidMount() {
		console.log(this.props);
	}

	goToGameStore() {}

	render() {
		return (
			<div className="Home">
				<h1>THIS IS A HOME FUCKING PAGE! </h1>
				<button className="btn btn-primary">Go to Buy Game</button>
			</div>
		);
	}
}

export default withRouter(Home);
