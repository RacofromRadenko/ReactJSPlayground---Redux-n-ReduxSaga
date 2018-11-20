import React, { Component } from 'react';
import './ItemDetails.less';
import AuxHolder from '../../container/hoc/AuxHolder';
import Modal from '../UI/Modal/Modal';

class ItemDetails extends Component {
	state = {
		orderID: this.props.location.state.transactionResponseData.order_id,
		postResponseData: this.props.location.state.transactionResponseData,
		itemData: this.props.location.state.data,
		videoPath: this.props.location.state.data.videos[0],
		showModal: false
	};

	componentWillMount() {
		console.log(this.props.location.state.data.videos[0]);
		console.log(this.props.location.state.data);
	}

	componentDidMount() {
		console.log(this.state);
	}

	handlerShowModal = () => {
		this.setState({
			showModal: true
		});
	};

	handleCancelModal = () => {
		this.setState({
			showModal: false
		});
		console.log('MoDAL CLICKED');
	};

	render() {
		return (
			<AuxHolder>
				<div className="ItemDetails">
					<div className="first-row">
						<h4 className="card-title">{this.props.location.state.data.name}</h4>
						<div className="card-text">
							<h6>Price:</h6>
							<p>{this.props.location.state.transactionResponseData.price}</p>
							<p>{this.props.location.state.transactionResponseData.currency}</p>
						</div>
					</div>

					<div className="second-row">
						<div className="image-wrapper">
							<div className="image-content">
								<img
									src={this.props.location.state.data.smallImage}
									alt={this.props.location.state.data.name}
								/>
							</div>
						</div>

						<div className="card-body">
							{this.state.videoPath !== undefined ? (
								<iframe
									width="560"
									height="315"
									title={this.props.location.state.data.name}
									src={this.state.videoPath.url.replace('watch', 'embed')}
								/>
							) : null}
						</div>
					</div>
					<div className="row second-row">
						<div className="col-md-6">
							<div className="text-wrapper">
								<h4 className="card-title">Minimal Requirements</h4>
								<div className="text-content">
									<h6>Required disk space:</h6>
									<p>{this.props.location.state.data.requirements.minimal.reqdiskspace}</p>
								</div>
								<div className="text-content">
									<h6>Required grapich card:</h6>
									<p>{this.props.location.state.data.requirements.minimal.reqgraphics}</p>
								</div>
								<div className="text-content">
									<h6>Required RAM Memory:</h6>
									<p>{this.props.location.state.data.requirements.minimal.reqmemory}</p>
								</div>
								<div className="text-content">
									<h6>Required Processor:</h6>
									<p>{this.props.location.state.data.requirements.minimal.reqprocessor}</p>
								</div>
								<div className="text-content">
									<h6>Required Operating System:</h6>
									<p>{this.props.location.state.data.requirements.minimal.reqsystem}</p>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<h3 className="card-title">Recommended Requirements</h3>
							<p className="card-text" />
						</div>
					</div>
					<div className="button-area">
						<button className="goBack btn btn-outline-primary" onClick={() => this.props.history.goBack()}>
							Go Back
						</button>
						<button
							className="goFurther btn btn-outline-success"
							// onClick={(e) => this.buySelectedItem(e, this.state.orderID)}
							onClick={this.handlerShowModal}
						>
							Buy
						</button>
					</div>
					<Modal
						dontShowModal={this.handlerShowModal}
						show={this.state.showModal}
						itemData={this.state.postResponseData}
						name={this.state.itemData.name}
						cancelModal={this.handleCancelModal}
					/>
				</div>
			</AuxHolder>
		);
	}
}

export default ItemDetails;
