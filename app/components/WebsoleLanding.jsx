import React, {Component, PropTypes} from 'react';
import render from 'react-dom';

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import '../sass/websole-landing.scss';

const style = {
  margin: 12,
};

export default class WebsoleLanding extends Component {

  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div>
        <p className="landing-main-section">Personalized Expense Manager ...</p>
        <span className="getting-started-btn">
          <RaisedButton
            onClick={this.props.onClickHandler}
            label="Get started"
            labelPosition="before"
            primary={true}
            style={style} />
        </span>
      </div>
    );
  }

}
