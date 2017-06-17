import React from "react";



export class Card extends React.Component{

  render(){
    return (
      <div>
        <button className="delete-tihs"></button>
        <button className="extend-this"></button>
        <div className="top-bar"></div>
        <div className="bottom-bar"></div>
      </div>
    );
  }
}
