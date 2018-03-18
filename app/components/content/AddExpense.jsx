import React, {Component, PropTypes} from 'react';
import render from 'react-dom';
import ViewExpenseHistory from './ViewExpenseHistory.jsx'

import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {blue300, indigo900} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import SvgIcon from 'material-ui/SvgIcon';

import '../../sass/add-expense.scss';

const textFieldStyle = {
  width: '100 !important'
}

const paidByTextFieldStyle = {
  width: '170 !important'
}

const buttonStyle = {
  marginRight: 20
}

const styles = {
  customWidth: {
    width: 150,
  },
};

const chipStyles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const splitMethod = ['All', 'Individually'];

const ExpenseIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2
    2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2
    2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </SvgIcon>
);

const setDefault = [
  {amountPaid: "600", paidBy: "Arun", paidDate: "Wed Mar 15 2017 08:11:14 GMT+0530 (IST)", splitBy: "All"},
  {amountPaid: "75", paidBy: "Sajith", paidDate: "Wed Mar 15 2017 08:11:14 GMT+0530 (IST)", splitBy: "Individually", splitAmong: ["Arun", "Sajith", "Vaisakh"]},
  {amountPaid: "100", paidBy: "Joby", paidDate: "Wed Mar 15 2017 08:11:14 GMT+0530 (IST)", splitBy: "Individually", splitAmong: ["Arun", "Sajith", "Vaisakh", "Shabin"]}
];

export default class AddExpense extends Component {

  constructor (props) {
    super (props);
    this.state = {
      isSnackbarVisible: false,
      fullExpenseList: [],
      //fullExpenseList: setDefault,
      paidBy: '',
      amountPaid: '',
      paidDate: new Date(),
      splitBy: null,
      splitByValue: null,
      splitAmong: [],
      isDialogueBoxVisible: false, // To handle dialogue boxed
      dialogueBoxTitle: '',
      dialogueBoxContent: '',
      viewHistory: false
    }
  }

  componentDidMount () {
    console.log("Did Mount : Add Expense : ");
    if (this.props.groupExpenseList.length) {
      this.setState({
       fullExpenseList: this.props.groupExpenseList
      })
    }
  }

  componentWillReceiveProps (nextProps, nextState) {
    console.log("Receiving Props : ", nextProps, nextState);
  }

  handleCloseExpenseHistory = () => {
    this.setState({
      viewHistory: false
    })
  }

  handleCloseDialogue = () => {
    this.setState({
      isDialogueBoxVisible: false,
      dialogueBoxTitle: '',
      dialogueBoxContent: ''
    })
  }

  resetData = () => {
    this.setState({
      paidBy: '',
      amountPaid: '',
      paidDate: new Date(),
      splitBy: null,
      splitByValue: null,
      splitAmong: []
    })
  }

  throwErrorMessage = () => {
    this.setState({
      isDialogueBoxVisible: true,
      dialogueBoxTitle: 'Warning',
      dialogueBoxContent: "You must select group members to split this expense"
    });
    return;
  }

  updateCurrentExpenseList = () => {
    const {
      paidBy,
      amountPaid,
      paidDate,
      splitBy,
      splitAmong
    } = this.state;

    let data = {};
    let fullExpenseList = this.state.fullExpenseList;

    // update expense only if all the required fields are filled by user
    if (paidBy && amountPaid && splitBy) {
      data.paidBy = paidBy;
      data.amountPaid = amountPaid;
      data.paidDate = paidDate;
      data.splitBy = splitBy;

      // If user has selected splitBy as 'Individually' -> then user also should be selected groupMembers to split amount
      // else => throw an error message which will help users to edit the given data
      if ( (splitBy === splitMethod[1] && splitAmong.length) || (splitBy === splitMethod[0]) ) {
        splitAmong.length ? data.splitAmong = splitAmong : null;
        fullExpenseList.push(data);
        this.setState({
          fullExpenseList: fullExpenseList
        });
        this.props.updateGroupExpense(fullExpenseList); // Updating the expense list in parent component
        this.resetData();

      } else {
        this.throwErrorMessage ();
      }

      //this.resetData();

    } else {
      // Condition to handle blank fields in user input form
      this.setState({
        isDialogueBoxVisible: true,
        dialogueBoxTitle: 'Warning',
        dialogueBoxContent: "You can not proceed without filling the required fields"
      })
    }
  }

  handleRequestCloseSnackbar = () => {
    this.setState({
      isSnackbarVisible: false
    })
  }

  updateSplitByMembers = (index) => {
    // Fn to update split an expense among the groupMembers
    // Logic : If user is clicking on a chip for ther first time,
    //       then add member to the splitBy list, else
    //       If user clicking on the same name again, then remove his/her name from the list

    let selectedMember = this.props.groupMembers[index];
    let splitwiseList = this.state.splitAmong;

    if (splitwiseList.includes(selectedMember)) {
      // If user already exisits
      let index = splitwiseList.indexOf(selectedMember);
      splitwiseList.splice(index, 1);
    } else {
      // If user selecting a member for the first time
        splitwiseList.push(selectedMember);
    }

    this.setState({
      splitAmong: splitwiseList
    })
  }

  updateSplitMethod = (event, index, value) => {
    console.log("index : ", index, "value : ", value);
    this.setState({
      splitByValue: value, // State value to keep focus on selectField according to the user selected value
      splitBy: splitMethod[value] // State value to update splitBy method of current expense
    })
  }

  getFormattedDate = (date) => {
    /** Fn. to update the selected date into
      * mm-dd-yyyy format
      */
    let day = '' + date.getDate();
    let month = '' + date.getMonth();
    let year = date.getFullYear();

    if (day.length < 2) {
      day = '0' + day;
    }
    if (month.length < 2) {
      month = '0' + month;
    }

    return [day, month, year].join('-');
  }

  updateDate = (nul, date) => {
    this.setState ({
      paidDate: this.getFormattedDate(date)
    })
  }

  updateAmountPaid = (event) => {
    event.target.value && this.setState({
      amountPaid: event.target.value
    })
  }

  updatePaidBy = (value) => {
    /** Fn. to update the value of 'paidBy' Field
      * will be triggered on every onChange event
      */
    value && this.setState({
        paidBy: value
    });
  }

  renderSplitBySplit = () => {
    // Fn to display the split by members list - when user selects 'Split by Individually' option
    return (
      <div className="websole_splitby-members-list">
        Here is the list of users
      </div>
    )
  }

  renderGroupMembersList = () => {
    let groupMembers = this.props.groupMembers;
    let membersList = groupMembers.map( (name, index) => {

      return (
        <Chip
          key={index}
          backgroundColor={this.state.splitAmong.includes(name) ? blue300 : null }
          style={chipStyles.chip}
          onTouchTap={ () => {this.updateSplitByMembers(index)}}>
          <Avatar size={32}>{name[0]}</Avatar>
            {name}
        </Chip>
      )
    });

    return (
      <div className="websole_members-list">
        {membersList}
      </div>
    );
  }

  enableExpenseHistory = () => {
    this.setState({
      viewHistory: true
    });
  }

  calculateGroupExpense = () => {
    console.log("paidBy : ", this.state.paidBy);
    if (this.state.paidBy && this.state.amountPaid) {
      /** Condition to prevent a minor bug from UI -
        * Currently each expense will add into the expenseList only when user clicks on the 'ADD' button
        * If user directly click on the CALCULATE EXPENSE button while adding the last expense in group,
        * the last expense will not be added into the list
        * So, whenever user clicks on CALCULATE EXPENSE button, if any data resides on the form (Especially the last expense)
        *   will be added into the account in this condition
        */
      this.updateCurrentExpenseList();
      this.props.saveAndCalculateExpense(this.state.fullExpenseList);
    } else {
      this.props.saveAndCalculateExpense(this.state.fullExpenseList);
    }
  }

  renderExpenseForm = () => {
    const actions = [
      <RaisedButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleCloseDialogue}
      />
    ];

    return (
      <div>
        <div>
          <span className="expense-form-paid-by">
            <AutoComplete
              style={paidByTextFieldStyle}
              floatingLabelText="Paid by : "
              searchText={this.state.paidBy}
              filter={AutoComplete.caseInsensitiveFilter}
              dataSource={this.props.groupMembers || []}
              onUpdateInput={this.updatePaidBy}
              />
          </span>
          <span className="expense-form-paid-amount">
            <TextField
              type="number"
              style={textFieldStyle}
              hintText="100"
              value={this.state.amountPaid}
              floatingLabelText="Amount Paid"
              onChange={this.updateAmountPaid}
            />
          </span>
        </div>
        <div className="expense-form-datePicker">
          <DatePicker hintText="Select date"  defaultDate={this.state.paidDate} onChange={this.updateDate} container="inline" mode="landscape" />
        </div>
        <div className="expense-form-selectField">
          <SelectField
            floatingLabelText="Split Among .. "
            value={this.state.splitByValue}
            onChange={this.updateSplitMethod}
            style={styles.customWidth}>
            <MenuItem value={0} primaryText="All" />
            <MenuItem value={1} primaryText="Individually" />
          </SelectField>
        </div>
        {/* Section to render group members - only if user select 'split Individually' option */}
        {this.state.splitBy && this.state.splitBy === splitMethod[1] && this.renderGroupMembersList()}
        <div className="websole_add-expense-buttons-list">
          <RaisedButton
            label="ADD"
            onClick={this.updateCurrentExpenseList}
            primary={true}
            style={buttonStyle} />
          <RaisedButton
            label="Calculate Expense"
            onClick={this.calculateGroupExpense}
            disabled={!this.state.fullExpenseList.length}
            primary={true}
            style={buttonStyle} />
        </div>
        <Snackbar
          open={this.state.isSnackbarVisible}
          message="Expense added to the list"
          autoHideDuration={3000}
          onRequestClose={this.handleRequestCloseSnackbar}
        />
        <Dialog
          title={this.state.dialogueBoxTitle}
          actions={actions}
          modal={false}
          open={this.state.isDialogueBoxVisible}
          onRequestClose={this.handleCloseDialogue}>
          {this.state.dialogueBoxContent}
        </Dialog>
      </div>
    );
  }

  deleteExpense = (index) => {
    let expenseListRef = this.state.fullExpenseList;
    expenseListRef.splice(index, 1);
    this.setState({
      fullExpenseList: expenseListRef
    })

  }

  render () {
    return (
      <div>
        <div className="websole_title-block">
          <p className="add-expense-title">Your final step .. Share expense details here </p>
          <span className="websole_expense-history">
            <Badge
              onClick={this.enableExpenseHistory}
              badgeContent={this.state.fullExpenseList.length}
              secondary={true}
              badgeStyle={{top: 15, right: 15}}>
                <IconButton tooltip="Expense History">
                  <ExpenseIcon />
                </IconButton>
            </Badge>
          </span>
        </div>
        <div>
          {this.renderExpenseForm()}
        </div>
          {this.state.viewHistory &&
            <ViewExpenseHistory
              viewHistory={this.state.viewHistory}
              fullExpenseList={this.state.fullExpenseList}
              handleClose={this.handleCloseExpenseHistory}
              deleteExpense={this.deleteExpense}/>
          }
      </div>
    );
  }

}
