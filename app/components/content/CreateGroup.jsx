import React, {Component, PropTypes} from 'react';
import render from 'react-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class CreateGroup extends Component {

  constructor (props) {
    super (props);
    this.state = {
      //groupName: this.props.groupName ? this.props.groupName : ''
      groupName: 'Flat Inmates' // Comment this line & add above line as the correct one
    }
  }

  componentWillReceiveProps (nextProps, nextState) {
    nextProps.groupName && this.setState({ groupName: nextProps.groupName })
  }

  handleOnChange = (event) => {
    this.setState({
      groupName: event.target.value
    })
  }

  updateGroupName = (event) => {
    (event.which === 13 || event.keyCode === 13) && this.state.groupName
      && this.props.updateGroupName(this.state.groupName);
  }

  handleNext = (event) => {
    event.preventDefault;
    this.state.groupName && this.props.updateGroupName(this.state.groupName);
  }


  render () {
    return (
      <div style={{paddingTop: 50, paddingLeft: 60}}>
        <TextField
          hintText="Hint Text"
          floatingLabelText="Add your group name here .."
          value={this.state.groupName}
          onChange={this.handleOnChange}
          onKeyDown={this.updateGroupName}/>
        <div style={{marginTop: 50, marginLeft: 300}}>
          <FlatButton
              label="Back"
              disabled={this.state.stepIndex === 0}
              onTouchTap={this.props.handlePrev}
              style={{marginRight: 12}}
            />
            <RaisedButton
              label="Next"
              disabled={this.state.stepIndex === 2}
              primary={true}
              onTouchTap={this.handleNext}
            />
        </div>
      </div>
    );
  }

}
