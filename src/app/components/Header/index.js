import React from 'react';

export class Header extends React.Component {
  render() {
    return(
      <nav className="navbar navbar-defalt">
        <div className="container">
          <div className="navbar-header">
            <ul className="nav navbar-nav">
              <li><a href='#'>MOVIES LIST</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
