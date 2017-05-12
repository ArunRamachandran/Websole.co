import React, {Component, PropTypes} from 'react';
import render from 'react-dom';
import NavbarIconSet from './NavbarIconSet.jsx';
import WebsoleLanding from './WebsoleLanding.jsx';
import DataProcessor from './DataProcessor.jsx';

import '../sass/home.scss';

const divStyle = {
  background: '../images/slide01.jpg'
}

export default class Home extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isLandingPage: true,
      isScanNsplit: false,
      isNormalSplit: false
    }
  }

  showLandingPage = (e) => {
    this.setState({
      isLandingPage: true,
      isScanNsplit: false,
      isNormalSplit: false

    })
  }

  getStarted = (e) => {
    this.setState({
      isLandingPage: false,
      isNormalSplit: true
    })
  }

  enableScanSplit = (e) => {
    this.setState({
      isLandingPage: false,
      isScanNsplit: true
    })
  }

  render () {
    return (
      <div>
        <nav className="fixed-navigation-bar">
          <div className="home-div">
            <p onClick={this.showLandingPage}>Websole.co</p>
          </div>
          <NavbarIconSet/>
        </nav>
        <div>
          {this.state.isLandingPage &&
            <WebsoleLanding 
              onClickHandler={this.getStarted}
              enableScanSplit={this.enableScanSplit}/>
          }
          {
            !this.state.isLandingPage && 
              <DataProcessor
                isNormalSplit={this.state.isNormalSplit}
                isScanNsplit={this.state.isScanNsplit}/>
          }
        </div>
      </div>
    );
  }
}
