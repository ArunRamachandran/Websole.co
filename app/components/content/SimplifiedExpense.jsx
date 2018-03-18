'use strict'

import React, {Component, PropTypes} from 'react';
import render from 'react-dom';
import {calculateSimplifiedExpense} from '../utils/simplifiedExpenseUtil.js';

import ActionAnnouncement from '../../svg/launch.js';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import '../../sass/view-expense.scss';

const style = {
  marginLeft: '20'
};

const textFieldStyle = {
  'width': '100px',
  'marginLeft': '20px'
};

const paymentDetails = {
  'marginLeft': '20px'
}

const creditValueStyle = { // Green
  'color': '#0e740a'
}

const debitValueStyle = { // Red
  'color': '#FFA500'
}

const paperStyle = {
  'width': '300px',
  'position': 'relative'
}


export default class SimplifiedExpense extends Component {


  renderCreditDetails = (creditData) => {
    let creditContent = creditData.map((credit, index) => {
      let creditRef = credit.amount;
      creditRef = creditRef < 0 ? -1 * creditRef : creditRef;
      return (
        <TextField id={`websole-expense_simplified_${index}`}
          value={`Collect ₹ ${creditRef}/- ⇦ from ${credit.name}`}
          style={paymentDetails}
          underlineShow={false}/>
      );
    })

    return creditContent;
  }

  renderDebitDetails = (debitData) => {
    let debitContent = debitData.map((debit, index) => {
      let debitRef = debit.amount;
      debitRef = debitRef < 0 ? -1 * debitRef : debitRef;

      return (
          <TextField id={`websole-expense_simplified_${index}`}
            value={`give ₹ ${debitRef}/- ⇨ to ${debit.name}`}
            style={paymentDetails}
            underlineShow={false}/>
      )
    });
    return debitContent;
  }

  renderSimplifiedExpense = (expenseList) => {
    let content = expenseList.map( (member, index) =>{
      return (
        <li key={index} className="websole-final_list_elements">
          <Paper zDepth={2} style={paperStyle}>
          <TextField id={`websole-expense_data_${index}`} value={member.name} style={textFieldStyle} underlineShow={false} />
          <TextField id={`websole-expense_data_${index}`}
            value={member.amount > 0 ? `₹ ${member.amount}/-` : `₹ ${-1 * member.amount}/-`}
            style={textFieldStyle}
            inputStyle={member.amount >= 0 ? debitValueStyle : creditValueStyle}
            underlineShow={false} />
          {member.credit.length ? this.renderCreditDetails(member.credit) : <noscript/>}
          {member.debit.length ? this.renderDebitDetails(member.debit) : <noscript/> }
          <Divider />
          </Paper>
        </li>
      );
    })
    return content;
  }

  processData = (calculatedExpense) => {
    /** minimalData : [{'name': 'abc', 'amount': 100}, {'name': 'xyz', 'amount': 500}, ....] **/
    let minimalData = []
    calculatedExpense.forEach( (member, index) => {
      minimalData.push({name: member.name, amount: member.amount});
    });
    return minimalData; /** Returning a dummy content **/
  }

  render () {
    //console.log("Received Props : ", this.props.calculatedExpense);
    let minimalData = this.processData(this.props.calculatedExpense);
    //console.log("minimalData : ", minimalData);
    let simplifiedExpense = calculateSimplifiedExpense(minimalData);
    console.log("Final data : ", simplifiedExpense);
    return (
      <ul className="websole-expense_overview">
        {this.renderSimplifiedExpense(simplifiedExpense)}
      </ul>
    );
  }
}
