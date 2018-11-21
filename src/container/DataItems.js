import React, { Component } from 'react';
import Item from '../components/Item';
import './DataItems.less';
import axios from 'axios';
import { connect } from 'react-redux';
import { store } from '../index';

import { GET_PRICE_RANGE } from '../store/action';

import * as actionTypes from '../store/action';

class DataItems extends Component {
	state = {
		data: [],
		page: 1,
		pages: [],
		total: 0,
		itemDetails: false,
		currency: 'EUR',
		minPrice: 0,
		maxPrice: 1000
	};

	componentDidMount() {
		this.pullData();
		this.props.onRequestData();
	}

	componentDidUpdate() {
		console.log('[FETCH WITH REDUX SAGA AND REDUX DATA]', this.props.data);
		console.log('[FETCH WITH REDUX SAGA AND REDUX FETCHING]', this.props.fetching);
		console.log('[FETCH WITH REDUX SAGA AND REDUX TOTAL]', this.props.total);
		console.log('[FETCH WITH REDUX SAGA AND REDUX PAGE]', this.props.page);
		console.log('[FETCH WITH REDUX SAGA AND REDUX PAGES]', this.props.pages);
		console.log('[FETCH WITH REDUX SAGA AND REDUX CURRENCY]', this.props.currency);
		console.log('[FETCH WITH REDUX SAGA AND REDUX MIN PRICE]', this.props.minPrice);
		console.log('[FETCH WITH REDUX SAGA AND REDUX MAX PRICE]', this.props.maxPrice);
		console.log('[FETCH WITH REDUX SAGA AND REDUX Eror]', this.props.error);
	}

	handleMinPriceEvent = (event) => {
		// console.log(event.target.value);
		// this.props.minPrice = event.target.value;

		// console.log(this.props.minPrice);

		// this.setState(
		// 	{
		// 		minPrice: event.target.value
		// 	},
		// 	() => {
		// 		this.pullData();
		// 	}
		// );

		return event.target.value;
	};

	handleMaxPriceEvent = (event) => {
		// console.log(event.target.value);
		// this.props.maxPrice = event.target.value;

		// console.log(this.props.maxPrice);
		// this.setState(
		// 	{
		// 		maxPrice: event.target.value
		// 	},
		// 	() => {
		// 		this.pullData();
		// 	}
		// );
		const value = event.target.value;

		store.dispatch(GET_PRICE_RANGE(10, 20));
		console.log(value);
	};

	pullData() {
		const config = {
			url: 'https://sandboxapi.g2a.com/v1/products',
			method: 'GET',
			headers: {
				Authorization: 'qdaiciDiyMaTjxMt, 74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875',
				'Content-Type': 'application/json'
			},
			processData: false,
			params: {
				page: 1,
				minPriceFrom: this.state.minPrice,
				minPriceTo: this.state.maxPrice
			}
		};

		axios(config)
			.then((response) => {
				console.log(response.data.docs);

				this.setState(
					{
						data: response.data.docs,
						total: response.data.total,
						pages: (function() {
							let totalPages = [];
							for (let i = 1; i <= Math.ceil(response.data.total / 20); i++) {
								totalPages.push(i);
							}

							return totalPages;
						})()
					},
					() => {
						console.log(response.data.total);
					}
				);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	pageUp = () => {
		if (parseInt(this.props.total) - parseInt(this.props.page) * 20 >= 0) {
			this.setState(
				{
					page: this.state.page + 1
				},
				() => {
					this.props.onRequestData();
				}
			);
		}
	};

	pageDown = () => {
		if (parseInt(this.state.page) > 1) {
			this.setState(
				{
					page: this.state.page - 1
				},
				() => {
					this.props.onRequestData();
				}
			);
		}
	};

	changePage = (ev) => {
		console.log(ev.target.getAttribute('data-page'));
		this.setState(
			{
				page: parseInt(ev.target.getAttribute('data-page'))
			},
			() => {
				this.onRequestData();
			}
		);
	};

	addToAccount = (e, data) => {
		console.log(e.target.value, data);

		e.preventDefault();
		console.log(data.id);
		const config = {
			crossDomain: true,
			url: 'https://sandboxapi.g2a.com/v1/order',
			method: 'POST',
			headers: {
				Authorization: 'qdaiciDiyMaTjxMt, 74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875',
				'Content-Type': 'application/json'
			},
			processData: false,
			data: { product_id: data.id }
		};

		axios(config)
			.then((res) => {
				// console.log(res);
				if (res.status === 200) {
					console.log('DATA RESPONSE', res.data);
					// return <Redirect to="/item-details/" />;
					return this.props.history.push({
						pathname: '/item-details',
						state: {
							data: data,
							transactionResponseData: res.data
						}
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	ascendingSort = () => {
		// console.log('prvi', this.state.data);

		this.setState({
			data: this.state.data.sort((a, b) => {
				return b.minPrice - a.minPrice;
			})
		});
		// console.log('drugi', this.state.data);
	};

	descendingSort = () => {
		this.setState({
			data: this.state.data.sort((a, b) => {
				return a.minPrice - b.minPrice;
			})
		});
	};

	render() {
		const item = this.props.fetching
			? this.props.data.map((item) => {
					return (
						<Item
							name={item.name}
							key={item.id}
							thumbnail={item.thumbnail}
							image={item.smallImage}
							moreInfo={this.moreInformation}
							add={this.addToAccount}
							data={item}
							price={item.minPrice}
							currency={this.state.currency}
						/>
					);
				})
			: null;

		return (
			<div className="DataItems" style={this.props.fetching ? { display: 'flex' } : { display: 'none' }}>
				<div className="PriceRangeArea">
					<button className="btn btn-primary" onClick={this.descendingSort}>
						Descending Sort
					</button>
					{/* <label>
						From:
						<input type="text" onChange={this.handleMinPriceEvent} />
						<p>{this.state.currency}</p>
					</label>
					<label>
						To:
						<input type="text" onChange={this.handleMaxPriceEvent} />
						<p>{this.state.currency}</p>
					</label> */}

					<label>
						From:
						<input type="text" value={this.props.minPrice} onChange={this.minPriceHandler} />
						<p>{this.props.currency}</p>
					</label>
					<label>
						To:
						<input type="text" value={this.props.maxPrice} onChange={this.maxPriceHandler} />
						<p>{this.props.currency}</p>
					</label>
					<button className="btn btn-primary" onClick={this.ascendingSort}>
						Ascending Sort
					</button>
					{/* <button onClick={() => this.props.onRequestData()}>Fetch data with saga i redux</button> */}

					{/* <button onClick={this.pullDataWithPriceRange}>Price Filter</button> */}
				</div>
				{item}
				<div className="bottom-area">
					<button
						className={this.state.page === 1 ? 'btn btn-info disabled' : 'btn btn-info'}
						onClick={() => this.pageDown()}
					>
						Previous
					</button>
					{this.state.pages.map((key) => {
						return (
							<button
								className={this.state.page === key ? 'btn btn-info disabled' : 'btn btn-info'}
								key={key}
								data-page={key}
								onClick={(ev) => {
									this.changePage(ev);
								}}
							>
								{key}
							</button>
						);
					})}
					<button
						className={
							this.state.page === this.state.pages[this.state.pages.length - 1] ? (
								'btn btn-info disabled'
							) : (
								'btn btn-info'
							)
						}
						onClick={() => this.pageUp()}
					>
						Next
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.data,
		fetching: state.fetching,
		total: state.total,
		page: state.page,
		pages: state.pages,
		currency: state.currency,
		error: state.error,
		minPrice: state.minPrice,
		maxPrice: state.maxPrice
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestData: () => dispatch({ type: actionTypes.GET_ALL_PRODUCTS_MAKE_API_REQUEST }),
		// getPriceRange: (minPrice, maxPrice) =>
		// 	dispatch({
		// 		type: actionTypes.GET_PRICE_RANGE,
		// 		minPrice,
		// 		maxPrice
		// 	})
		minPriceHandler: (minPrice) => dispatch(actionTypes.minPrice(minPrice)),
		maxPriceHandler: (maxPrice) => dispatch(actionTypes.maxPrice(maxPrice))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DataItems);
