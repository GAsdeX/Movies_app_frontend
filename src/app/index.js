import React from 'react';
import { render } from 'react-dom';
import { on } from 'react-router';
import {Modal, Button} from 'react-bootstrap';

import {Header} from './components/Header/'
import {Home} from './components/Home/'

// import {Card} from './components/Card/'
// import {DatePicker} from 'react-toolbox'


class App extends React.Component {
  render() {
    var user = {
      name: "Anna",
      sports : ["football", 'mma']
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
              <Header/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
              <Home name="MAX" user={user} age={27} />
          </div>
        </div>


      </div>
    );
  }
}

render(<App/>, document.getElementById('app'))
