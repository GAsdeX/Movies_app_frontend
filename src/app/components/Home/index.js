// HOME PARE COMPONENT

import React from "react";
// import {render} from "react-render";
//
// import { Card } from "./Card/"

export class Home extends React.Component {

  addMovie(){

  }

  componentDidMount() {
    console.log('yo');
    var movies_list = this.state.movies_list;
    console.log(this.state);

    $.get('http://localhost:3000/getmovies', function(data) {
        data.forEach(function(i){
          movies_list.push(i)
        })
     });

     this.setState({
       movies_list : movies_list
     })
  }


  constructor (props){
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {movies_list : [] };


  }


  render(){
    var movies_list = this.state;
    // console.log(this.state.movies_list);  .... нихуя не передалось
    return (
          <div>
            <p>IN a component</p>
            <p>Yor name is {this.props.name}, your age is {this.props.age}</p>

            <div>
              <div className="top-bar">{JSON.stringify(movies_list)}</div>
              <div className="bottom-bar"></div>
            </div>
          </div>

      );
  }
}
Home.propTypes = {
  name: React.PropTypes.string,
  age : React.PropTypes.number
}
