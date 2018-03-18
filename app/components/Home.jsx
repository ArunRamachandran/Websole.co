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
      isLandingPage: true
    }
  }

  showLandingPage = (e) => {
    this.setState({
      isLandingPage: true
    })
  }

  getStarted = (e) => {
    this.setState({
      isLandingPage: false
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
            <WebsoleLanding onClickHandler={this.getStarted}/>
          }
          {!this.state.isLandingPage && <DataProcessor/>}
        </div>
      </div>
    );
  }
}
