import React, { Component } from 'react';
import Item from '../components/Item';
import './DataItems.less';
import axios from 'axios';

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
	}

	handleMinPriceEvent = (event) => {
		// console.log(event.target.value);

		this.setState(
			{
				minPrice: event.target.value
			},
			() => {
				this.pullData();
			}
		);
	};

	handleMaxPriceEvent = (event) => {
		// console.log(event.target.value);

		this.setState(
			{
				maxPrice: event.target.value
			},
			() => {
				this.pullData();
			}
		);
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
		if (parseInt(this.state.total) - parseInt(this.state.page) * 20 >= 0) {
			this.setState(
				{
					page: this.state.page + 1
				},
				() => {
					this.pullData();
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
					this.pullData();
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
				this.pullData();
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
		const item = this.state.data.map((item) => {
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
		});

		return (
			<div className="DataItems">
				<div className="PriceRangeArea">
					<button className="btn btn-primary" onClick={this.descendingSort}>
						Descending Sort
					</button>
					<label>
						From:
						<input type="text" onChange={this.handleMinPriceEvent} />
						<p>{this.state.currency}</p>
					</label>
					<label>
						To:
						<input type="text" onChange={this.handleMaxPriceEvent} />
						<p>{this.state.currency}</p>
					</label>
					<button className="btn btn-primary" onClick={this.ascendingSort}>
						Ascending Sort
					</button>

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

export default DataItems;
