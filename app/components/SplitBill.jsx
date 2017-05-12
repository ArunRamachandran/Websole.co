import React, {Component, PropTypes} from 'react';
import render from 'react-dom';

import '../sass/split-bill.scss';

const ReceiptIcon = (props) => (
	<svg viewBox="0 0 30 30" className="svg-receipt-icon" xmlns="http://www.w3.org/2000/svg">
	    <path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 
	    	22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 
	    	1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"/>
	    <path d="M0 0h24v24H0z" fill="none"/>
	</svg>
);

const CameraUpload = (props) => (
	<svg viewBox="0 0 30 30" className="svg-camera-upload-icon" xmlns="http://www.w3.org/2000/svg">
	    <circle cx="12" cy="14" r="3.2"/>
	    <circle cx="12" cy="14" fill="none" r="5"/>
	    <path d="M16 3.33c2.58 0 4.67 2.09 4.67 4.67H22c0-3.31-2.69-6-6-6v1.33M16 6c1.11 0 2 .89 2 2h1.33c0-1.84-1.49-3.33-3.33-3.33V6"/>
	    <path d="M24 0H0v24h24V0z" fill="none"/>
	    <path d="M17 9c0-1.11-.89-2-2-2V4H9L7.17 6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9h-5zm-5 10c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
	</svg>
);

export default class SplitBill extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return  (
			<div className="websole_split-bill">
				<span onClick={this.props.splitManually} className="websole_receipt-icon">
					<ReceiptIcon/>
					<p>Split Manually</p>
				</span>
				<span onClick={this.props.enableScanSplit}className="websole-camera-upload-icon">
					<CameraUpload/>
					<p>Scan 'N' Split</p>
				</span>
			</div>
		);
	}
}