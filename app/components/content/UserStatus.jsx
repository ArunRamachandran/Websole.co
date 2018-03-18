import React, {Component, PropTypes} from 'react';
import render from 'react-dom';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import '../../sass/user-status.scss';

const paperStyle = {
  'width': '230px',
  'position': 'relative',
  'cursor': 'pointer'
};

const paymentPaperStyle = {
  'width': '230px',
  'position': 'relative',
  'cursor': 'pointer',
  'marginTop': '3px',
  'marginBottom': '3px'
}

const textFieldStyle = {
  'width': '100px',
  'paddingLeft': '60px'
};

const textFieldStyle_sub = {
  'width': '100px',
  'paddingLeft': '75px'
};

const paymentData = {
  'width': '400px',
  'paddingLeft': '10px'
}

export default class UserStatus extends Component {

  getSum = (values) => {
    let valueRef = [];
    values.forEach((entry, index) => {
      entry.amount < 0 ? valueRef.push(-1 * entry.amount) : valueRef.push(entry.amount);
    })
    return valueRef.reduce((a, b) => a + b, 0);
  }

  getDebitInformation = (debitData) => {
    let content = debitData.map((debit, index) => {
      return (
        <p key={index}>Give ₹{debit.amount}/- to <b>{debit.name}</b></p>
      );
    })
    return content;
  }

  getCreditInformation = (creditData) => {
    let content = creditData.map((credit, index) => {
      return (
        <Paper zDepth={2} style={paymentPaperStyle}>
          <TextField key={index} value={`Collect ₹${credit.amount}/- from ${credit.name}`} style={paymentData} underlineShow={false} />
          <Divider />
        </Paper>
      );
    })
    return content;
  }

  createCustomTemplate = (data) => {

    let creditDetails = this.getCreditInformation(data.credit);
    let debitDetails = this.getDebitInformation(data.debit);

     return (
       <div>
        <div className="websole-user_status_header">
          <span className="websole-user_credit">
            <Paper zDepth={2} style={paperStyle}>
              <TextField value="Total Credit " style={textFieldStyle} underlineShow={false} />
              <TextField value={ this.getSum(data.credit) !== 0 ?  `₹${this.getSum(data.credit)} /-` : `${this.getSum(data.credit)}`}  style={textFieldStyle_sub} underlineShow={false}/>
              <Divider />
            </Paper>
          </span>
          <span className="websole-user_debit">
            <Paper zDepth={2} style={paperStyle}>
              <TextField value="Total Debit " style={textFieldStyle} underlineShow={false} />
              <TextField value={ this.getSum(data.debit) !== 0 ?  `₹${this.getSum(data.debit)} /-` : `${this.getSum(data.debit)}`}  style={textFieldStyle_sub} underlineShow={false}/>
              <Divider />
            </Paper>
          </span>
        </div>
        <div className="websole-user_status_list">
          <span>{creditDetails}</span>
          <span>{debitDetails}</span>
        </div>
       </div>
     );
  }

  abstractUserInformation = () => {
    let userData;
    this.props.simplifiedExpense.forEach((user) => {
      if (user.name === this.props.calculatedExpense[this.props.userIndex].name) {
        userData = user;
      }
    })
    return userData;
  }

  render () {

    let selectedUserData = this.abstractUserInformation();

    let userStatusActions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.props.handleClose}
      />
    ];

    return (
      <Dialog
        title={`${selectedUserData.name}'s expense overview`}
        actions={userStatusActions}
        modal={false}
        open={true}
        onRequestClose={this.props.handleClose}>
        {this.createCustomTemplate(selectedUserData)}
      </Dialog>
    );
  }
}
