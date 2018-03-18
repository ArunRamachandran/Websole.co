import React, {Component, PropTypes} from 'react';
import render from 'react-dom';

import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import '../sass/navbariconset.scss'

const style = {
  margin: 12,
};

const iconStyles = {
  marginRight: 24,
};

export default class NavbarIconSet extends Component {

  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div className="navbar-icons">
        <RaisedButton label="FAQ" primary={true} style={style} />
        <RaisedButton label="Sign In" primary={true} style={style} />
        <IconButton
          iconClassName="muidocs-icon-custom-github" tooltip="View code"
          tooltipPosition="bottom-center"
        />

        {/*<RaisedButton
          href="https://github.com/callemall/material-ui"
          target="_blank"
          secondary={true}
          icon={<FontIcon className="muidocs-icon-custom-github" />}
          style={style}
        />
        <FontIcon className="material-icons" style={iconStyles}>home</FontIcon>*/}
      </div>
    );
  }

}
