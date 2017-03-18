import React, {Component, PropTypes} from 'react';
import render from 'react-dom';
import ActionAnnouncement from '../../svg/launch.js';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';


import '../../sass/view-expense.scss';

const style = {
  marginLeft: '20'
};

export default class ViewExpense extends Component {

  constructor (props) {
    super (props);
    this.state = {
      showLoader : true,
      helpIconStyle: {'color': '#7e7e7e', 'cursor': 'pointer'}
    }
  }

  componentDidMount () {
    // Function to show a dummy loader for few seconds
    let loader = setTimeout(() => {
      this.setState({
        showLoader: false
      });
    }, 300);

    //clearInterval(loader);
  }

  showLoader = () => {
    return (
      <div className="loading"></div>
    );
  }

  renderUtilityDisplay = (calculatedExpense, index) => {
    console.log("Full expense : ", calculatedExpense, "index : ", index, "Ref : ", this.props.groupExpenseList);
    let refData = this.props.groupExpenseList; // User given expense list -> Inorder to get the data corresponding to each ref.


  }

  renderSplitAmount = (calculatedExpense) => {
    let content = calculatedExpense.map( (member, index) =>{
      return (
        <span key={index} className="websole-final_list_elements">
          <TextField id={`websole-expense_data_${index}`} value={member.name} style={style} underlineShow={false} />
          <TextField id={`websole-expense_data2_${index}`} value={member.amount > 0 ? `₹ ${member.amount}/-` : member.amount} underlineShow={false}/>
          <ActionAnnouncement helpIconStyle={this.state.helpIconStyle} onClick={() => this.renderUtilityDisplay(calculatedExpense, index)}/>
          <Divider />
        </span>
      );
    })
    return content;
  }

  render () {
    return (
      <div>
        {this.state.showLoader ?
          this.showLoader() :
          <div className="websole-final_list">
            <Paper zDepth={2}>
              {this.renderSplitAmount(this.props.calculatedExpense)}
            </Paper>
          </div>
        }
      </div>
    );
  }

}
