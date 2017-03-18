import React, {Component, PropTypes} from 'react';
import render from 'react-dom';

import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import '../../sass/add-members.scss';

const textFieldStyle = {
  marginLeft: 20
};

const buttonStyle = {
  marginRight: 20
}

export default class AddMembers extends Component {

  constructor (props) {
    super (props);
    this.state = {
      addNewMember: false,
      currentMemberName: '',
      groupMembers: ["Arun", "Joby", "Sajith", "Vaisakh", "Athul", "Shabin"],
      isLimitExceeded: false,
      isInvalidUserInput: false,
      errorMessage: ''
    }
  }

  initiateAction = (event) => {
    event.preventDefault;
    if (this.state.groupMembers.length <= 7) {
      this.setState({
        addNewMember: true
      })
    } else {
      this.setState({
        isLimitExceeded: true
      })
    }
  }

  handleCloseDialogue = () => {
    this.setState({
      isLimitExceeded: false,
      isInvalidUserInput: false
    })
  }

  onChangeCurrentMemberName = (event) => {
    event.preventDefault;
    this.setState({
      currentMemberName: event.target.value
    })
  }

  /** Function to throw an error message to user.
    * If givenName already exists in groupMembers array OR value is empty
    * throw error message
    */
  inValidUserInput = (givenName) => {
    let errorMessage;
    givenName ? (errorMessage = 'Given user already exists in group !') : (errorMessage = 'Field can not be empty');
    this.setState({
      isInvalidUserInput: true,
      errorMessage: errorMessage
    })
  }

  /** Function to update existing groupMembers **/
  updateGroupMembers = (event) => {
    if ( (event.which === 13 || event.keyCode === 13) ) {

      let currentGroupMembers = this.state.groupMembers;
      let newMemberName = this.state.currentMemberName

      // If user has given a proper name in text filed  && which is not a duplicate
      // value -> Then update currentGroupMembers array
      newMemberName && !(currentGroupMembers.includes(newMemberName)) ?
        currentGroupMembers.push(newMemberName)
        : this.inValidUserInput(newMemberName);

      this.setState ({
        groupMembers: currentGroupMembers,
        currentMemberName: '',
        addNewMember: false
      })
    }
  }

  addNewMember = () => {
    return (
      <div>
        <div className="right-submenu-text">Add a newmember</div>
        <div className="right-submenu-btn">
          <FloatingActionButton style={buttonStyle} onClick={this.initiateAction}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <div>
          {this.state.addNewMember &&
          <TextField
            hintText="Hint Text"
            floatingLabelText="Write group member name ..."
            value={this.state.currentMemberName}
            onChange={this.onChangeCurrentMemberName}
            onKeyDown={this.updateGroupMembers}/>}
        </div>
      </div>
    );
  }

  deleteGroupMember = (event, index) => {
    event.preventDefault;
    let currentMembers = this.state.groupMembers;
    currentMembers.splice(index, 1);
    this.setState({
      groupMembers: currentMembers
    })
  }

  renderGroupMembers = () => {
    let currentMembers = this.state.groupMembers.map( (name, index) => {
      return (
        <span key={index}>
          <TextField
            value={name}
            underlineShow={false}
            style={textFieldStyle}/>
            <IconButton
              style={{cursor: 'pointer'}}
              tooltip="Delete member"
              tooltipPosition="bottom-left">
                <FontIcon
                  onClick={(event) => {this.deleteGroupMember(event, index)}}
                  className="material-icons">
                  delete
                </FontIcon>
            </IconButton>
          <Divider/>
        </span>
      )
    });
    return currentMembers;
  }

  render () {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleCloseDialogue}
      />
    ];

    return (
      <div className="layout-outer-wraper">

        <div className="left-panel">
          <p>{this.props.groupName}</p>
          {this.state.groupMembers.length &&
            <Paper zDepth={2}>
              {this.renderGroupMembers()}
            </Paper>
          }
        </div>

        <div className="right-panel">
          {this.addNewMember()}
        </div>

        { /* Render save button only when user enter atleast one valid input */
          this.state.groupMembers.length &&
            <div className="add-member-save-btn">
              <RaisedButton
                label="SAVE & CONTINUE"
                onClick={() => {this.props.saveGroupmembers(this.state.groupMembers)}}
                disabled={!this.state.groupMembers.length}
                primary={true}
                style={buttonStyle} />
            </div>
        }

        {this.state.isLimitExceeded &&
          <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={false}
            open={this.state.isLimitExceeded}
            onRequestClose={this.handleCloseDialogue}>
            Sorry !! Currently we support maximum of 7 members into a group.
          </Dialog>
        }
        {this.state.isInvalidUserInput &&
          <Dialog
            title="Invalid input"
            actions={actions}
            modal={false}
            open={this.state.isInvalidUserInput}
            onRequestClose={this.handleCloseDialogue}>
            {this.state.errorMessage}
          </Dialog>
        }

      </div>
    );
  }

}
