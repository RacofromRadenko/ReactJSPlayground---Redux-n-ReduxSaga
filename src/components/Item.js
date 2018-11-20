import React, { Component } from 'react';
import './Item.less';

class Item extends Component {
	render() {
		return (
			<div className="Item" onClick={(e) => this.props.add(e, this.props.data)}>
				<div className="image-area">
					<div className="image-wrapper">
						<div className="image-content">
							<img src={this.props.image} alt={this.props.name} />
						</div>
					</div>
				</div>
				<div className="text-area">
					<div className="card-body">
						<h5 className="card-title">{this.props.name}</h5>

						<div className="text-wrapper">
							<h6>Price:</h6>
							<p>
								{this.props.price} {this.props.currency}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Item;
