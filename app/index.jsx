import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Home from './components/Home.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Websole extends Component {
    render () {
    injectTapEventPlugin();
        return (
          <MuiThemeProvider>
            <Home/>
          </MuiThemeProvider>
        );
    }
}

render(<Websole/>, document.getElementById('app'));
