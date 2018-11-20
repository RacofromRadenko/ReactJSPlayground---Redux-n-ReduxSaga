import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import DataItems from './DataItems';
import './Main.less';
import Tournaments from '../components/Tournaments/Tournaments';
import ItemDetails from '../components/ItemDetails/ItemDetails';

class Main extends Component {
	// state = {
	// 	showMoreDetails: false
	// };

	render() {
		return (
			<div className="Main">
				<Route path="/tournaments" component={Tournaments} />
				<Route path="/item-details" component={ItemDetails} />
				<Route path="/" exact component={DataItems} />
			</div>
		);
	}
}

export default Main;
