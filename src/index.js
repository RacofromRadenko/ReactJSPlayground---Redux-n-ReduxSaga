import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { dataItemsReducer } from './store/reducers/dataItemsReducer';
import { getPriceRangeReducer } from './store/reducers/dataItemsReducer';
import { ascendingSortingReducer } from './store/reducers/dataItemsReducer';
import { descendingSortingReducer } from './store/reducers/dataItemsReducer';
import { pageUpAndDownReducer } from './store/reducers/dataItemsReducer';
import { rootSaga } from './store/sagas/sagaGetAllProducts';
import createSagaMiddleware from 'redux-saga';
import { combineReducers, createStore, applyMiddleware } from 'redux';

//TODO (need to setup correctly)

const rootReducers = combineReducers({
	dataItems: dataItemsReducer,
	getPriceRange: getPriceRangeReducer,
	pageUpnDown: pageUpAndDownReducer
	// ascendingSortData: ascendingSortingReducer,
	// descendingSortData: descendingSortingReducer
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

console.log(store.getState());

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
