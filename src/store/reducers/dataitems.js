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

// export function getPriceRangeReducer(state = initialState, action) {
// 	console.log('111111', action);

// 	switch (action.type) {
// 		case actionTypes.GET_PRICE_RANGE:
// 			console.log('REDUCER PRICE RANGE', action);
// 			return {
// 				...state
// 				// minPrice: action.minPrice,
// 				// maxPrice: action.maxPrice
// 			};

// 		default:
// 			break;
// 	}
// }

export function getMinPriceReducer(state = initialState.minPrice, action) {
	switch (action.type) {
		case 'GET_MIN_PRICE':
			console.log('USAO U SRANJE JEBENO GET MIN PRICE');
			return {
				minPrice: action.minPrice
			};
		case 'GET_MAX_PRICE':
			console.log('USAO U SRANJE JEBENO GET MAN PRICE');

			return {
				minPrice: action.maxPrice
			};

		default:
			return state;
	}
}
