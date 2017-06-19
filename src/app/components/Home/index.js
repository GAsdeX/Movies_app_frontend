// HOME PARE COMPONENT

import React from "react";
import {CardView} from './CardView/';

import { convertINI, compare } from './config';

export class Home extends React.Component {

  openCreateWindow(event){
    this.setState({
        addFormState: true
    })
  }

  dellMovie(id){

    var movies_list = [];
    $.ajax({
      url: 'http://localhost:3000/dellmovie/'+id,
      type: 'DELETE',
      traditional:true,
      dataType: 'json',
      success: (result) => {
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
    });
  }

  hideAddForm(event) {
    this.setState({
        addFormState: false
    })
    console.log('hide');
  }

  loadINI(event) {
    // document.getElementById('load').addEventListener('change', readFile, false);

    var input = event.target;
    var text = NaN;
    var result = NaN;
    var reader = new FileReader();
    var movies_list = [];
    reader.onload = function(){
      text = reader.result;
      this.setState({
        movies_list : movies_list
      })
      result = convertINI(text);
      console.log(result);

    };
    reader.readAsText(input.files[0]);

  }

  addNewMovie(event) {
    event.preventDefault();
    let title = this.refs.title.value;
    let release_year = this.refs.release_year.value;
    let format = this.refs.format.value;
    let stars = this.refs.stars.value;
    let iniFile = this.refs.iniFile.value;
    let movies_list = [];

    $.ajax({
      url: "http://localhost:3000/addmovie",
      type: 'POST',
      traditional:true,
      dataType: 'json',
      data: {
        title : title,
        release_year : release_year,
        format : format,
        stars : stars
      },
      success: (result) => {
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
    });

    console.log(iniFile);

    if (iniFile) {
      console.log('ffff');
    }

    // console.log(title,'ffff');
  }

  componentDidMount() {  // refrash while uploading

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

  describeCard(item){
    console.log(item);
    this.setState({
      currentMovie : item,
      describeMovie : true
    })
  }

  sortByAlphabet() {
    var movies_list = [];
    console.log(movies_list);

    $.get('http://localhost:3000/getmovies', function(data) {
        data.forEach(function(i){
            movies_list.push(i)
            console.log(i);
        })
        //inside function this will point to function itself, not on a class

    });
    console.log(movies_list);
    movies_list.sort(compare);
    console.log(movies_list);
  }

  constructor (props){
    super(props);

    this.dellMovie = this.dellMovie.bind(this);
    this.openCreateWindow = this.openCreateWindow.bind(this);
    this.hideAddForm = this.hideAddForm.bind(this);
    this.addNewMovie = this.addNewMovie.bind(this);
    this.loadINI = this.loadINI.bind(this);
    this.describeCard = this.describeCard.bind(this);
    this.sortByAlphabet = this.sortByAlphabet.bind(this);

    this.state = {
      movies_list : [],
      addFormState : false,
      describeMovie : false
    };
  }


  render(){
    var movies_list = this.state.movies_list;
    var addFormState = this.state.addFormState;
    var describeMovie = this.state.describeMovie  ;
    // console.log(movies_list);
    var form = <div className="new-movie">
                <div onClick={this.hideAddForm} className="ovarlay"></div>
                <form className="input-field" >
                  <h3>Add movie</h3>
                  <input type="text" ref="title" placeholder="Title"/>
                  <input type="text" list="format" ref='format' placeholder="Format"/>
                     <datalist id="format">
                      <option>DVD</option>
                      <option>Blu-ray</option>
                      <option>VHS</option>
                     </datalist>
                  <input type="number" ref='release_year' placeholder="Release year"/>
                  <input ref='stars' placeholder="Stars"/>

                  <input ref="iniFile" id="file-input" onChange={this.loadINI} type='file'/>

                  <button onClick={this.addNewMovie}>Add movie</button>
                </form>

              </div>
    var currentMovie = NaN;
    var display = <div className="desc-movie">
                    <div className="overlay"></div>
                    <div className="desc">
                      <p>{currentMovie.title}</p>
                      <p>{currentMovie.release_year}</p>
                      <p>{currentMovie.format}</p>
                      <p>{currentMovie.stars}</p>
                    </div>
                  </div>


    return (
          <div>

            <button type="submit" onClick={this.sortByAlphabet}>SORT BY TITLE</button>
            {this.state.movies_list.map((item, i) =>
              <div className="col-xs-3" key={i}>
                <div className="card-wrapper" onClick={() => {this.describeCard(item)}}>
                  <button onClick={()=>{this.dellMovie(item._id)}} className="delete-tihs"></button>
                  <button className="extend-this"></button>
                  <div className="top-bar">
                    <p>{item.title}</p>
                  </div>

                  <div className="bottom-bar">{item.format}</div>
                </div>

              </div>
          )}
          <button onClick={() => this.openCreateWindow()} className="add-new"></button>


          {addFormState ? form : null }
          {describeMovie ? display : null}


          </div>

      );
  }
}
Home.propTypes = {
  name: React.PropTypes.string,
  age : React.PropTypes.number
}
