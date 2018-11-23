import * as actionTypes from '../action';

const initialState = {
	data: null,
	fetching: false,
	pages: null,
	page: null,
	error: null,
	total: null,
	currency: null,
	minPrice: 0,
	maxPrice: 1000
};

export function dataItemsReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_ALL_PRODUCTS_REQUEST_SUCCESS:
			const currency = 'EUR';
			return {
				...state,
				data: action.data.docs,
				fetching: action.fetching,
				total: action.total,
				page: action.page,
				pages: (function() {
					let totalPages = [];
					for (let i = 1; i <= Math.ceil(action.total / 20); i++) {
						totalPages.push(i);
					}
					return totalPages;
				})(),
				currency: currency
			};

		case actionTypes.GET_ALL_PRODUCTS_REQUEST_FAILURE:
			console.log(state);
			// console.log(action);
			return {
				...state,
				error: action.error
			};
		default:
			return state;
	}
}

export function getPriceRangeReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_MIN_PRICE':
			console.log(state);
			console.log(action);
			return {
				...state,
				minPrice: action.minimumPrice
			};
		case 'GET_MAX_PRICE':
			console.log(state);
			console.log(action);
			return {
				...state,
				maxPrice: action.maximumPrice
			};

		default:
			return state;
	}
}

// TODO SORTING REDUCER

// PAGE UP AND PAGE DOWN MECHANISM

export function pageUpAndDownReducer(state = initialState, action) {
	switch (action) {
		case 'PAGE_UP':
			console.log('usao');
			if (parseInt(state.total) - parseInt(state.page) * 20 >= 0) {
				state.page += 1;
				this.dataItemsReducer();
			}

			return {
				...state,
				page: state.page
			};

		case 'PAGE_DOWN':
			console.log('usao');

			if (parseInt(state.page) >= 1) {
				state.page -= 1;
				this.dataItemsReducer();
			}

			return {
				...state,
				page: state.page
			};

		default:
			return state;
	}
}
