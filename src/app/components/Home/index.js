// HOME PARE COMPONENT

import React from "react";
import {CardView} from './CardView/';

import { convertINI, sortOn, findArr ,findActor} from './config';

var arr = [{title:'Holly'},{title:'margin'},{title:'lol'},{title:'padding'}]

console.log(findArr('in',arr));

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
    var loading_movies = [];
    reader.onload = () => {
      loading_movies = convertINI(reader.result);
      console.log(loading_movies.length);
      this.setState({
        loading_movies : loading_movies
      })
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

    let loading_movies = (iniFile ? this.state.loading_movies : { title : title,
                                                                  release_year : release_year,
                                                                  format : format,
                                                                  stars : stars});
    // console.log(loading_movies);



    if (iniFile) {
      let movies_list = [];
      loading_movies.map(function(i){

          $.ajax({
            url: "http://localhost:3000/addmovie",
            type: 'POST',
            traditional:true,
            dataType: 'json',
            data: i,
            success: (result) => {
              $.get('http://localhost:3000/getmovies', function(data) {
                  data.forEach(function(i){
                      movies_list.push(i)
                  })
                  //inside function this will point to function itself, not on a class
                  this.setState({
                      movies_list : movies_list
                  })
              });
            }
          })

      })
      var self = this;
      console.log(this);
      $.get('http://localhost:3000/getmovies', function(data) {
          data.forEach(function(i){
              movies_list.push(i)
          })
          //inside function this will point to function itself, not on a class
          self.setState({
              movies_list : movies_list
          })
          debugger;
      });
    } else {
        $.ajax({
        url: "http://localhost:3000/addmovie",
        type: 'POST',
        traditional:true,
        dataType: 'json',
        data: { title : title,
                release_year : release_year,
                format : format,
                stars : stars
              },
        success: (result) => {
          console.log(result);
        }
      });
    }

  }
  searchItem(event){
    event.preventDefault();

    let searshing_val = this.refs.searshing_val.value;
    let search_actor = this.refs.actor.value;


    var movies = [];

    var self = this;
    $.get('http://localhost:3000/getmovies', function(data) {
        data.forEach(function(i){
            movies.push(i)
        })
        //inside function this will point to function itself, not on a class
        if (searshing_val.length == 0 && search_actor.length == 0){
          self.setState({
            movies_list : movies
          })

        }
        if (searshing_val.length == 0 && search_actor.length > 0) {
          self.setState({
            movies_list : findActor(searshing_val, self.state.movies_list)
          })
        }
        if (searshing_val.length > 0 && search_actor.length == 0) {
          self.setState({
            movies_list : findArr(searshing_val, self.state.movies_list)
          })
        }
        else {
          self.setState({
            movies_list : findActor(search_actor, findArr(searshing_val, self.state.movies_list))
          })
          console.log(movies);
        }
    });
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
          });
      });
  }

  describeCard(i){
    console.log(i);
    this.setState({
      currentMovie : i,
      describeMovie : true
    })

    console.log(this.state.currentMovie);
    // debugger;
  }
  sortByAlphabet() {
    var movies_list = [];
    console.log(movies_list);

    $.get('http://localhost:3000/getmovies', (data) => {
        data.forEach(function(i){
          // debugger;
            movies_list.push(i)
            // console.log(i);
        })
        //inside function this will point to function itself, not on a class
        // console.log(sortOn(movies_list, "title"));


        this.setState({
          movies_list :movies_list.sort(function(a, b) {   console.log(a);
                                                          console.log(b);

                                                          if (a.title < b.title) {
                                                            return -1;
                                                          }
                                                          if (a.title > b.title) {
                                                            return 1;
                                                          }

                                                          // names must be equal
                                                          return 0}
                                                        )
        })
    });
    // console.log(movies_list.sort(compare));


    console.log(movies_list);
  }

  hideDescr() {
    this.setState({
      describeMovie : false
    })
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
    this.hideDescr = this.hideDescr.bind(this);
    this.searchItem = this.searchItem.bind(this);

    this.state = {
      movies_list : [],
      loading_movies : [],
      addFormState : false,
      describeMovie : false,
      currentMovie : {}
    };
  }


  render(){
    var movies_list = this.state.movies_list;
    var addFormState = this.state.addFormState;
    var describeMovie = this.state.describeMovie;
    var loading_movies = this.state.loading_movies;
    var currentMovie = this.state.currentMovie;

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
                  <p>{loading_movies.length}</p>
                  <button onClick={this.addNewMovie}>Add movie</button>
                </form>

              </div>
    var display = <div className="desc-movie">
                    <div className="overlay" onClick={this.hideDescr}></div>
                    <div className="desc">
                      <h4>{currentMovie.title}</h4>
                      <hr/>
                      <p>{currentMovie.format}</p>
                      <p>{currentMovie.release_year}</p>
                      <p>{currentMovie.stars}</p>
                    </div>
                  </div>

    return (
          <div>

            <div className="row"><input className="col-xs-4" placeholder="Title" type="text" ref="searshing_val" onChange={this.searchItem}></input></div>

            <div className="row"><input className="col-xs-4" placeholder="Actor" type="text" ref="actor" onChange={this.searchItem}></input></div>

            <div className="col-xs-12"><button type="submit" onClick={this.sortByAlphabet}>SORT BY TITLE</button></div>
            {this.state.movies_list.map((item, i) =>
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={i}>
                <button onClick={()=>{this.dellMovie(item._id)}} className="delete-tihs"></button>
                <div className="card-wrapper" onClick={() => {this.describeCard(item)}}>

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
