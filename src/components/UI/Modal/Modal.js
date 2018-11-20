import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import AuxHolder from '../../../container/hoc/AuxHolder';
import './Modal.less';
import Payconfirmation from '../../Payconfirmation/Payconfirmation';

class Modal extends Component {
	componentDidMount() {
		console.log(this.props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log(nextProps);
		console.log(nextState);
		return nextProps.show !== this.props.show || nextProps.children || this.props.children;
	}

	render() {
		return (
			<AuxHolder>
				<Backdrop show={this.props.show} clicked={this.props.dontShowModal} />
				<div
					className="Modal"
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0'
					}}
				>
					<Payconfirmation
						itemData={this.props.itemData}
						name={this.props.name}
						cancelModal={this.props.cancelModal}
					/>
				</div>
			</AuxHolder>
		);
	}
}

export default Modal;
