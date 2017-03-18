import React, {Component, PropTypes} from 'react';
import render from 'react-dom';
import CreateGroup from './CreateGroup.jsx';
import AddMembers from './AddMembers.jsx';
import AddExpense from './AddExpense.jsx';
import ViewExpense from './ViewExpense.jsx';

import {calculateExpense} from '../utils/expenseUtils.js';

import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';

export default class PersonalizedContent extends Component {

  constructor (props) {
    super (props);
    this.state = {
      stepIndex: 0,
      groupName: '',
      groupMembers: [],
      groupExpenseList: []
    }
  }

  saveAndCalculateExpense = (fullExpenseList) => {
    this.setState({
      groupExpenseList: fullExpenseList,
      calculatedExpense: calculateExpense(this.state.groupName, this.state.groupMembers, fullExpenseList)
    })
    //console.log("Exp. List : ", calculateExpense(this.state.groupName, this.state.groupMembers, fullExpenseList))
    this.handleNext();
  }

  updateGroupExpense = (expenseList) => {
    this.setState({groupExpenseList: expenseList});
  }

  saveGroupmembers = (groupMembers) => {
    // Callback fn to update groupMembers
    this.setState({  groupMembers: groupMembers });
    this.handleNext();
  }

  updateGroupName = (groupName) => {
    // Callback fn to groupName creator

    this.setState({ groupName: groupName });
    this.handleNext();
  }

  renderStepContent = (index) => {
    switch (index) {
      case 0:
        return <CreateGroup
          updateGroupName={this.updateGroupName}
          groupName={this.state.groupName}/>;
        break;

      case 1:
        console.log("Here we gooo...");
        return <AddMembers
          saveGroupmembers={this.saveGroupmembers}
          groupName={this.state.groupName}/>
        break;

      case 2:
        return <AddExpense
          updateGroupExpense={this.updateGroupExpense}
          groupExpenseList={this.state.groupExpenseList}
          groupMembers={this.state.groupMembers}
          saveAndCalculateExpense={this.saveAndCalculateExpense}/>;
        break;

      case 3:
        return <ViewExpense
          groupName={this.state.groupName}
          groupMembers={this.state.groupMembers}
          groupExpenseList={this.state.groupExpenseList}
          calculatedExpense={this.state.calculatedExpense}/>;
        break;

      default:
        return 'Found an invalid state';
    }
  }

  handleNext = () => {
    const stepIndex = this.state.stepIndex;
    stepIndex < 3 && this.setState({ stepIndex: stepIndex + 1 });
  }

  handlePrev = () => {
    const stepIndex = this.state.stepIndex;
    stepIndex > 0 && this.setState({ stepIndex: stepIndex - 1 })
  }

  render () {
    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper linear={true} activeStep={this.state.stepIndex}>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 0})}>
              Create Group
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 1})}>
              Add group members
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 2})}>
              Add expense
            </StepButton>
          </Step>
          <Step>
            <StepButton>
              View Simplified Expense
            </StepButton>
          </Step>
        </Stepper>

        <div>
          {this.renderStepContent(this.state.stepIndex)}
        </div>

      </div>
    );
  }

}
