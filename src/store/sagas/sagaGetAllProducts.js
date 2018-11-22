import { call, put, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { store } from '../../index';
import * as actionTypes from '../action';

export function* watcherSaga() {
	yield takeEvery(actionTypes.GET_ALL_PRODUCTS_MAKE_API_REQUEST, workerSaga);
}

export function fetchAllProducts() {
	const storeRedux = store.getState();
	console.log(storeRedux);
	console.log(storeRedux.getPriceRange.minPrice);
	console.log(storeRedux.getPriceRange.maxPrice);

	const axiosSetup = axios({
		method: 'GET',
		url: 'https://sandboxapi.g2a.com/v1/products',
		headers: {
			Authorization: 'qdaiciDiyMaTjxMt, 74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875',
			'Content-Type': 'application/json'
		},
		processData: false,
		params: {
			page: 1,
			minPriceFrom: storeRedux.getPriceRange.minPrice,
			minPriceTo: storeRedux.getPriceRange.maxPrice
		}
	});

	return axiosSetup;
}

export function* workerSaga() {
	try {
		const response = yield call(fetchAllProducts);
		console.log(response);
		const data = response.data;
		const total = response.data.total;
		const page = response.data.page;

		yield put({ type: actionTypes.GET_ALL_PRODUCTS_REQUEST_SUCCESS, data, total, page, fetching: true });
	} catch (error) {
		yield put({ type: actionTypes.GET_ALL_PRODUCTS_REQUEST_FAILURE, error });
	}
}

export function* rootSaga() {
	yield all([ watcherSaga(), fetchAllProducts(), workerSaga() ]);
}

export default rootSaga;
