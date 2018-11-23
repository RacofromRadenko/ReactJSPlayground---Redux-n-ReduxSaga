import React, { Component } from 'react';
import Item from '../components/Item';
import './DataItems.less';
import axios from 'axios';
import { connect } from 'react-redux';
import { pageDown, pageUp } from '../store/action';

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
		// this.pullData();
		this.props.onRequestData();
		console.log(this.props.pageUpnDown);
	}

	componentWillUpdate() {
		console.log('[FETCH WITH REDUX SAGA AND REDUX MAX SORTED DATA]', this.props.sortedData);
		console.log('[FETCH WITH REDUX SAGA AND REDUX DATA]', this.props.data);
	}

	componentDidUpdate() {
		console.log('[FETCH WITH REDUX SAGA AND REDUX DATA]', this.props.data);
		// console.log('[FETCH WITH REDUX SAGA AND REDUX FETCHING]', this.props.fetching);
		// console.log('[FETCH WITH REDUX SAGA AND REDUX TOTAL]', this.props.total);
		// console.log('[FETCH WITH REDUX SAGA AND REDUX PAGE]', this.props.page);
		// console.log('[FETCH WITH REDUX SAGA AND REDUX PAGES]', this.props.pages);
		// console.log('[FETCH WITH REDUX SAGA AND REDUX CURRENCY]', this.props.currency);
		console.log('[FETCH WITH REDUX SAGA AND REDUX MIN PRICE]', this.props.minPrice);
		console.log('[FETCH WITH REDUX SAGA AND REDUX MAX PRICE]', this.props.maxPrice);
		console.log('[FETCH WITH REDUX SAGA AND REDUX MAX SORTED DATA]', this.props.ascendingSortData);
		console.log('[FETCH WITH REDUX SAGA AND REDUX MAX SORTED DATA]', this.props.descendingSortData);
		// console.log('[FETCH WITH REDUX SAGA AND REDUX Eror]', this.props.error);
	}

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

	// pageUp() {
	// 	this.props.onRequestData();
	// }

	// pageDown() {
	// 	this.props.onRequestData();
	// }

	// pageUpHandler = () => {
	// 	// if (parseInt(this.props.total) - parseInt(this.props.page) * 20 >= 0) {
	// 	// 	this.setState(
	// 	// 		{
	// 	// 			page: this.state.page + 1
	// 	// 		},
	// 	// 		() => {
	// 	// 			this.props.onRequestData();
	// 	// 		}
	// 	// 	);
	// 	// }
	// 	console.log('pageUpHandler');

	// 	this.props.onRequestData();
	// };

	// pageDownHandler = () => {
	// 	// if (parseInt(this.state.page) > 1) {
	// 	// 	this.setState(
	// 	// 		{
	// 	// 			page: this.state.page - 1
	// 	// 		},
	// 	// 		() => {
	// 	// 			this.props.onRequestData();
	// 	// 		}
	// 	// 	);
	// 	// }
	// 	console.log('pagDownHandler');

	// 	this.props.onRequestData();
	// };

	changePage = (ev) => {
		console.log(ev.target.getAttribute('data-page'));
		this.setState(
			{
				page: parseInt(ev.target.getAttribute('data-page'))
			},
			() => {
				this.props.onRequestData();
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

	// ascendingSort = () => {
	// 	// console.log('prvi', this.state.data);

	// 	this.setState({
	// 		data: this.state.data.sort((a, b) => {
	// 			return b.minPrice - a.minPrice;
	// 		})
	// 	});
	// 	// console.log('drugi', this.state.data);
	// };

	// descendingSort = () => {
	// 	this.setState({
	// 		data: this.state.data.sort((a, b) => {
	// 			return a.minPrice - b.minPrice;
	// 		})
	// 	});
	// };

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

		console.log(this.props.page);
		let pagesLength = this.props.pages;
		if (pagesLength !== undefined && pagesLength !== null) {
			pagesLength = Object.keys(pagesLength)[Object.keys(pagesLength).length - 1];
		}

		return (
			<div className="DataItems" style={this.props.fetching ? { display: 'flex' } : { display: 'none' }}>
				<div className="PriceRangeArea">
					{/* <button className="btn btn-primary" onClick={this.descendingSort}>
						Descending Sort
					</button> */}
					<button
						className="btn btn-primary"
						onClick={() => this.props.descendingSortHandler(this.props.data)}
					>
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
						<input type="text" onChange={(e) => this.props.minPriceHandler(parseInt(e.target.value))} />
						<p>{this.props.currency}</p>
					</label>
					<label>
						To:
						<input type="text" onChange={(e) => this.props.maxPriceHandler(parseInt(e.target.value))} />
						<p>{this.props.currency}</p>
					</label>
					{/* <button className="btn btn-primary" onClick={this.ascendingSort}>
						Ascending Sort
					</button> */}
					<button
						className="btn btn-primary"
						onClick={() => this.props.ascendingSortHandler(this.props.data)}
					>
						Ascending Sort
					</button>
					{/* <button onClick={() => this.props.onRequestData()}>Fetch data with saga i redux</button> */}

					{/* <button onClick={this.pullDataWithPriceRange}>Price Filter</button> */}
				</div>
				{item}
				{/* <div className="bottom-area">
					<button
						className={this.state.page === 1 ? 'btn btn-info disabled' : 'btn btn-info'}
						onClick={() => this.pageDown()}
					>
						Previous
					</button>
					{this.props.pages.map((key) => {
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
				</div> */}

				<div className="bottom-area">
					<button
						className={this.props.page === 1 ? 'btn btn-info disabled' : 'btn btn-info'}
						onClick={() => this.props.pageDownHandler()}
					>
						Previous
					</button>
					{/* {this.props.pages.map((key) => {
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
					})} */}
					<button
						className={this.props.page === { pagesLength } ? 'btn btn-info disabled' : 'btn btn-info'}
						onClick={() => this.props.pageUpHandler()}
					>
						Next
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	// const { dataItems, getPriceRange, sortingData } = this.props;

	return {
		data: state.dataItems.data,
		fetching: state.dataItems.fetching,
		total: state.dataItems.total,
		page: state.dataItems.page,
		pages: state.dataItems.pages,
		currency: state.dataItems.currency,
		error: state.dataItems.error,
		minPrice: state.getPriceRange.minPrice,
		maxPrice: state.getPriceRange.maxPrice,
		pageUpnDown: state.pageUpnDown
		// ascendingSortData: state.ascendingSortData.data,
		// descendingSortData: state.descendingSortData.data
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestData: () => dispatch({ type: actionTypes.GET_ALL_PRODUCTS_MAKE_API_REQUEST }),
		minPriceHandler: (minPrice) => dispatch(actionTypes.minPrice(minPrice)),
		maxPriceHandler: (maxPrice) => dispatch(actionTypes.maxPrice(maxPrice)),
		// ascendingSortHandler: (data) => dispatch({ type: actionTypes.ASCENDING_SORT, data: data }),
		// descendingSortHandler: (data) => dispatch({ type: actionTypes.DESCENDING_SORT, data: data })
		// ascendingSortHandler: (data) => dispatch(actionTypes.ascendingDataSort(data)),
		// descendingSortHandler: (data) => dispatch(actionTypes.descendingDataSort(data)),
		pageUpHandler: () => dispatch(actionTypes.pageUp()),
		pageDownHandler: () => dispatch(actionTypes.pageDown())

		// changePageHandler: () => dispatch({type: actionTypes.CHANGE_PAGE,  })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DataItems);
