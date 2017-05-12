import React, {Component, PropTypes} from 'react';
import render from 'react-dom';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';

export default class ScanNsplit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			finished: false,
			stepIndex: 0
		}
	}

	dummyAsync = (cb) => {
		this.setState({loading: true}, () => {
			this.asyncTimer = setTimeout(cb, 500)
		});
	};

	handleNext = () => {
		const {stepIndex} = this.state;
		if (!this.state.loading) {
			this.dummyAsync(() => this.setState({
				loading: false,
				stepIndex: stepIndex + 1,
				finished: stepIndex >= 2
			}));
		}
	};

	handlePrev = () => {
		const {stepIndex} = this.state;
		if (!this.state.loading) {
			this.dummyAsync(() => this.setState({
				loading: false,
				stepIndex: stepIndex - 1
			}));
		}
	}

	render () {
		return (
			<h4>Upload your bill</h4>
		);
	}
}