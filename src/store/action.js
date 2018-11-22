export const GET_ALL_PRODUCTS_MAKE_API_REQUEST = 'GET_ALL_PRODUCTS_MAKE_API_REQUEST';
export const GET_ALL_PRODUCTS_REQUEST_SUCCESS = 'GET_ALL_PRODUCTS_REQUEST_SUCCESS';
export const GET_ALL_PRODUCTS_REQUEST_FAILURE = 'GET_ALL_PRODUCTS_REQUEST_FAILURE';
export const ASCENDING_SORT = 'ASCENDING_SORT';
export const DESCENDING_SORT = 'DESCENDING_SORT';
export function minPrice(minPrice) {
	return {
		type: 'GET_MIN_PRICE',
		minPrice
	};
}

export function maxPrice(maxPrice) {
	return {
		type: 'GET_MAX_PRICE',
		maxPrice
	};
}
