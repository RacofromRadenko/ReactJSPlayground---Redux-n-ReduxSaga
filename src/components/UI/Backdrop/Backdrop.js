import React from 'react';
import './Backdrop.less';

const Backdrop = (props) => {
	return props.show ? <div className="Backdrop" onClick={props.clicked} /> : null;
};

export default Backdrop;
