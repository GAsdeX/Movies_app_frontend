import React from "react";

export class Card extends React.Component {
  constructor (props){
    super();

    this.item_card = {
      title: props.title,
      format: props.format,
      release_year: props.release_year,
      stars: props.stars
    };
  }


  render(){
    return (
      <div>
        <button className="delete-tihs"></button>
        <button className="extend-this"></button>
        <div className="top-bar">{this.title}</div>
        <div className="bottom-bar"></div>
      </div>
    );
  }
}
