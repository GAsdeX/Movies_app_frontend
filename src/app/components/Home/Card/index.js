import React from "react";

export class Card extends React.Component {
  constructor (props){
    super(props);

    
  }


  render(){
    return (
      <div className="col-xs-3">
        <div className="card-wrapper">
          <button onClick={()=>{this.dellMovie(item._id)}} className="delete-tihs"></button>
          <button className="extend-this"></button>
          <div className="top-bar">
            <p>{item.title}</p>
          </div>

          <div className="bottom-bar">{item.format}</div>
        </div>

      </div>
    );
  }
}
