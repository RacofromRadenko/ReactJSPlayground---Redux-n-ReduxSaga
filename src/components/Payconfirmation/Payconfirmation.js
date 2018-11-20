import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Payconfirmation.less';
import axios from 'axios';

class Payconfirmation extends Component {
	state = {
		showCodenTransactionID: false,
		transactionID: null,
		transactionCode: null
	};

	componentDidMount() {
		console.log(this.props);
	}

	buySelectedItem = (e, orderID) => {
		e.preventDefault();
		const config = {
			crossDomain: true,
			url: 'https://sandboxapi.g2a.com/v1/order/pay/' + orderID,
			method: 'PUT',
			headers: {
				Authorization: 'qdaiciDiyMaTjxMt, 74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875',
				'Content-Type': 'application/json'
			},
			processData: false
		};

		const getKey = {
			crossDomain: true,
			url: 'https://sandboxapi.g2a.com/v1/order/key/' + orderID,
			method: 'GET',
			headers: {
				Authorization: 'qdaiciDiyMaTjxMt, 74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875',
				'Content-Type': 'application/json'
			},
			processData: false
		};

		axios(config)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					console.log('[TRANSACTION-ID]', res.data.transaction_id);

					this.setTransactionID(res.data.transaction_id);
					axios(getKey).then((res) => {
						console.log('[KEY]', res.data.key);
						this.setTransactionCODE(res.data.key);
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});

		console.log(orderID);
		console.log(config.data);
	};

	setTransactionID = (transactionID) => {
		this.setState({
			transactionID: transactionID
		});
	};

	setTransactionCODE = (transactionCode) => {
		this.setState({
			transactionCode: transactionCode,
			showCodenTransactionID: true
		});
	};

	confirmComplete = () => {
		return this.props.history.push('/');
	};

	render() {
		const displayResults = this.state.showCodenTransactionID ? (
			<div className="Payconfirmation">
				<div className="text-wrapper">
					<h3>Order details completed</h3>
					<hr />
					<span>
						<h5>Transaction ID:</h5>
						<p>
							<code>{this.state.transactionID}</code>
						</p>
					</span>

					<span>
						<h5>KEY:</h5>
						<p>
							<code>{this.state.transactionCode}</code>
						</p>
					</span>
				</div>
				<button className="btn btn-outline-success confirm" onClick={this.confirmComplete}>
					Confirm
				</button>
			</div>
		) : (
			<div className="Payconfirmation">
				<div className="text-wrapper">
					<h3>Order details</h3>
					<hr />
					<span>
						<h5>Order ID:</h5>
						<p>{this.props.itemData.order_id}</p>
					</span>
					<span>
						<h5>Name:</h5>
						<p>{this.props.name}</p>
					</span>
					<span>
						<h5> Price:</h5>
						<p>{this.props.itemData.price}</p>
						<p>{this.props.itemData.currency}</p>
					</span>
					<hr />
				</div>
				<button
					className="btn btn-outline-primary"
					style={{
						float: 'left',
						display: 'block',
						width: '40%',
						margin: 'auto 5%'
					}}
					onClick={this.props.cancelModal}
				>
					Cancel
				</button>
				<button
					className="btn btn-outline-success"
					style={{
						float: 'right',
						display: 'block',
						width: '40%',
						margin: 'auto 5%'
					}}
					onClick={(e) => this.buySelectedItem(e, this.props.itemData.order_id)}
				>
					Buy
				</button>
			</div>
		);

		return <div className="Payconfirmation">{displayResults}</div>;
	}
}

export default withRouter(Payconfirmation);
