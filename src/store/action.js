export const GET_ALL_PRODUCTS_MAKE_API_REQUEST = 'GET_ALL_PRODUCTS_MAKE_API_REQUEST';
export const GET_ALL_PRODUCTS_REQUEST_SUCCESS = 'GET_ALL_PRODUCTS_REQUEST_SUCCESS';
export const GET_ALL_PRODUCTS_REQUEST_FAILURE = 'GET_ALL_PRODUCTS_REQUEST_FAILURE';
// export const ASCENDING_SORT = 'ASCENDING_SORT';
// export const DESCENDING_SORT = 'DESCENDING_SORT';
export const minPrice = (minPrice) => {
	return {
		type: 'GET_MIN_PRICE',
		minimumPrice: minPrice
	};
};

export const maxPrice = (maxPrice) => {
	return {
		type: 'GET_MAX_PRICE',
		maximumPrice: maxPrice
	};
};

export const ascendingDataSort = (data) => {
	return {
		type: 'ASCENDING_SORT',
		ascSort: data
	};
};

export const descendingDataSort = (data) => {
	return {
		type: 'DESCENDING_SORT',
		dscSort: data
	};
};

export const pageDown = () => {
	return {
		type: 'PAGE_DOWN'
	};
};

export const pageUp = () => {
	return {
		type: 'PAGE_DOWN'
	};
};
