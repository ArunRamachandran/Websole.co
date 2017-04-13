import React, {Component, PropTypes} from 'react';
import render from 'react-dom';

import '../../sass/view-expense-history.scss';

import Dialog from 'material-ui/Dialog';
import SvgIcon from 'material-ui/SvgIcon';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const ExpenseIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2
    2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2
    2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </SvgIcon>
);

const expenseListStyle = {
  span: {
    marginLeft: '4%'
  }
}


export default class ViewExpenseHistory extends Component {

  renderEmptyList = () => {
    return (
      <div className="websole_empty-expense-list">
        <div className="websole_exp-hist-empty-wallet"><ExpenseIcon/></div>
        <p className="websole_exp-hist-empty-title">Your expense history is empty</p>
        <p className="websole_exp-hist-empty-sub-title">start adding now ...</p>
      </div>
    );
  }

  deleteExpense = (event, index) => {
    this.props.deleteExpense(index);
  }

  renderExpenseList = (expenseList) => {
    let list = expenseList.map( (data, index) => {
      return (
        <div key={index} className="websole_expense-history-list">
          <span style={expenseListStyle.span}>{index + 1}. </span>
          <span style={expenseListStyle.span}>paid by: {data.paidBy}</span>
          <span style={expenseListStyle.span}>amount : {data.amountPaid}</span>
          <span style={expenseListStyle.span}>{data.splitBy !== "All" ? `splitAmong: ${data.splitAmong}`: 'splitAmong: All'}</span>
          <span style={expenseListStyle.span}>
            <IconButton
              style={{cursor: 'pointer'}}
              tooltip="Delete expense"
              tooltipPosition="bottom-left">
                <FontIcon
                  onClick={(event) => {this.deleteExpense(event, index)}}
                  className="material-icons">
                  delete
                </FontIcon>
            </IconButton>
          </span>
          <Divider/>
        </div>
      );
    });
    return list;
  }

  render () {
    const dialogueBoxActions = [
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.handleClose}
      />
    ]

    return (
      <div>
        <Dialog
            title="Expense History"
            modal={false}
            actions={dialogueBoxActions}
            open={this.props.viewHistory}
            onRequestClose={this.props.handleClose}
            autoScrollBodyContent={true}>
          {this.props.fullExpenseList.length ?
                this.renderExpenseList(this.props.fullExpenseList)
            : this.renderEmptyList()
          }
        </Dialog>
      </div>
    );
  }
}
