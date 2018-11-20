import React, { Component } from 'react';
import './App.less';
import Header from './components/Header/Header';
import Main from './container/Main';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<Main />
			</div>
		);
	}
}

export default App;
