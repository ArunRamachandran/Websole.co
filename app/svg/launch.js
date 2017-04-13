import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';

let ActionAssessment = (props) => (
  <IconButton tooltip="Check Details" tooltipPosition="bottom-right">
    <SvgIcon {...props}>
      <path style={{'color': '#7e7e7e'}} d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
    </SvgIcon>
  </IconButton>
);
ActionAssessment = pure(ActionAssessment);
ActionAssessment.displayName = 'ActionAssessment';
ActionAssessment.muiName = 'SvgIcon';

export default ActionAssessment;
