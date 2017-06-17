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
    let movies_list = this.state.movies_list;
    // console.log(this.movies_list);

      $.get('http://localhost:3000/getmovies', function(data) {
          data.forEach(function(i){
            movies_list.push(i)
            console.log(i);
          })
       });
       console.log(movies_list);
      this.setState({
        movies_list : movies_list
      })
  }


  doGet() {
    // console.log(this.movies_list);

    let movies_list = this.state.movies_list;
    console.log(this.movies_list);

      $.get('http://localhost:3000/getmovies', function(data) {
          data.forEach(function(i){
            movies_list.push(i)
            console.log(i);
          })
       });
       console.log(movies_list);
      this.setState({
        movies_list : movies_list
      })
      // console.log(movies_list);
  }

  constructor (props){
    super(props);
    this.state = {movies_list:[]};
    this.doGet = this.doGet.bind(this);

  }


  render(){
    let movies_list = this.movies_list;
    this.doGet

    return (
          <div>
            <p>IN a component</p>
            <p>Yor name is {this.props.name}, your age is {this.props.age}</p>
            <button onClick={this.doGet}></button>
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
