import React, {Component, PropTypes} from 'react';
import render from 'react-dom';
import ActionAnnouncement from '../../svg/launch.js';
import SimplifiedExpense from './SimplifiedExpense.jsx';
import UserStatus from './UserStatus.jsx';
import {calculateSimplifiedExpense} from '../utils/simplifiedExpenseUtil.js';


import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

import '../../sass/view-expense.scss';

const style = {
  marginLeft: '20'
};

const textFieldStyle = {
  'width': '100px',
  'marginLeft': '20px'
};

const paperStyle = {
  'width': '300px',
  'position': 'relative'
}

const helpIconStyle = {
  'color': '#7e7e7e',
  'cursor': 'pointer'
}

export default class ViewExpense extends Component {

  constructor (props) {
    super (props);
    this.state = {
      showLoader : true,
      showUserStatus: false,
      enableSimplifiedView: false,
      simplifiedExpense: [],
      userIndex: null
    }
  }

  componentDidMount () {
    // Process to get the simplifiedExpense of the entire group
    if (this.props.calculatedExpense) {
      let minimalData = this.processData(this.props.calculatedExpense);
      let simplifiedExpense = calculateSimplifiedExpense(minimalData);
      console.log("did mount : simplified : ", simplifiedExpense);
      this.setState({
        simplified: simplifiedExpense
      })
    }
    // Function to show a dummy loader for few seconds
    let loader = setTimeout(() => {
      this.setState({
        showLoader: false
      });
    }, 300);
  }

  showLoader = () => {
    return (
      <div className="loading"></div>
    );
  }

  processData = (calculatedExpense) => {
    /** minimalData : [{'name': 'abc', 'amount': 100}, {'name': 'xyz', 'amount': 500}, ....] **/
    let minimalData = []
    calculatedExpense.forEach( (member, index) => {
      minimalData.push({name: member.name, amount: member.amount});
    });
    return minimalData; /** Returning a dummy content **/
  }

  renderUtilityDisplay = (calculatedExpense, index) => {
    this.setState({
      showUserStatus: true,
      userIndex: index
    })
  }

  renderSplitAmount = (calculatedExpense) => {
    let content = calculatedExpense.map( (member, index) =>{
      return (
        <span key={index} className="websole-final_list_elements">
          <Paper zDepth={2} style={paperStyle}>
          <TextField id={`websole-expense_data_${index}`} value={member.name} style={textFieldStyle} underlineShow={false} />
          <TextField id={`websole-expense_data2_${index}`} value={member.amount > 0 ? `₹ ${member.amount}/-` : member.amount}  style={textFieldStyle} underlineShow={false}/>
          <ActionAnnouncement onClick={() => this.renderUtilityDisplay(calculatedExpense, index)}/>
          <Divider />
          </Paper>
        </span>
      );
    })
    return content;
  }

  renderNormalExpenseView = () => {
    return (
      <div className="websole-expense_overview">
          {this.renderSplitAmount(this.props.calculatedExpense)}
      </div>
    );
  }

  renderSimplifiedExpense = () => {
    return (
      <SimplifiedExpense
        calculatedExpense={this.props.calculatedExpense}/>
    );
  }

  renderFinalExpenseList = () => {
    /** If user enable 'Simplified' view option :
      *  then render SimplifiedView Or NormalView
      *  of the expense
      */
    let content = this.state.enableSimplifiedView ? this.renderSimplifiedExpense() : this.renderNormalExpenseView();
    return content;
  }

  toggleExpenseViewMode = () => {
    this.setState({
      enableSimplifiedView: !this.state.enableSimplifiedView
    })
  }

  handleClose = () => {
    this.setState({
      showUserStatus: false
    })
  }

  handleToggle = () => {
    console.log("Toggle-onClick");
  }

  render () {

    return (
      <div>
        {this.state.showLoader ? this.showLoader() :
          <div className="websole-final_list">
            {this.renderFinalExpenseList()}
          </div>
        }

        <div className="websole-save_btn">
          <RaisedButton label="Save" onClick={this.toggleExpenseViewMode} primary={true}/>
        </div>

        {this.state.showUserStatus &&
          <UserStatus
            simplifiedExpense={this.state.simplified}
            calculatedExpense={this.props.calculatedExpense}
            userIndex={this.state.userIndex}
            showUserStatus={this.state.showUserStatus}
            handleClose={this.handleClose}/>
        }

        {/*this.state.showUserStatus &&
          <div id="custom_modal" className="websole-modal_outline">
            <div id="modal_outline" className="websole-modal_content">
              <p>Some random test content</p>
              <FlatButton label="Close" primary={true} onClick={this.handleClose}/>
            </div>
          </div>
        */}
      </div>
    );
  }

}
