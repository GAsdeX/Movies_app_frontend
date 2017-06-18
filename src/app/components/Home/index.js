// HOME PARE COMPONENT

import React from "react";
// import {render} from "react-render";
//
// import { Card } from "./Card/"
// import '/Home.css';


// bundle.js:8499 Uncaught Error: Cannot find module "./components/Home/"

export class Home extends React.Component {

  addMovie(){
    $.post()
  }

  dellMovie(id){
    $.ajax({
      url: 'http://localhost:3000/dellmovie/'+id,
      type: 'DELETE',
      traditional:true,
      dataType: 'json',
      success: (result) => {
        this.forceUpdate()
      }
    });
  }

  componentDidMount() {
      console.log('yo');
      var movies_list = this.state.movies_list;
      // console.log(this.state);
      //save current this
      var self = this;
      $.get('http://localhost:3000/getmovies', function(data) {
          data.forEach(function(i){
              movies_list.push(i)
          })
          //inside function this will point to function itself, not on a class
          self.setState({
              movies_list : movies_list
          })
      });


  }


  constructor (props){
    super(props);
    this.dellMovie = this.dellMovie.bind(this);
    this.state = {movies_list : [] };



  }


  render(){
    var movies_list = (this.state.movies_list);  //.... нихуя не передалось
    console.log(movies_list);

    return (
          <div>

            {this.state.movies_list.map((item,i) =>
              <div className="col-xs-3">
                <div className="card-wrapper">
                  <button onClick={this.dellMovie(item._id)} className="delete-tihs"></button>
                  <button className="extend-this"></button>
                  <div className="top-bar">
                    <p>{item.title}</p>
                  </div>

                  <div className="bottom-bar">{item.format}</div>
                </div>

              </div>
          )}

          </div>

      );
  }
}
Home.propTypes = {
  name: React.PropTypes.string,
  age : React.PropTypes.number
}
