import React, {Component, PropTypes} from 'react';
import render from 'react-dom';
import PersonalizedContent from './content/PersonalizedContent.jsx';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import '../sass/data-processor.scss';

export default class DataProcessor extends Component {

  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div className="processor-wraper">
        <Card className="data-processor-main">
          <PersonalizedContent/>
        </Card>
      </div>
    );
  }

}
