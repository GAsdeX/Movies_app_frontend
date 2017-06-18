// HOME PARE COMPONENT

import React from "react";
import {CardView} from './CardView/'



// bundle.js:8499 Uncaught Error: Cannot find module "./components/Home/"

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

  addNewMovie(event) {
    this.preventDefault();
    let title = this.refs.title;
    let release_year = this.refs.release_year;
    let format = this.refs.format;
    let stars = this.refs.stars;

    console.log(title,'ffff');
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


  constructor (props){
    super(props);

    this.dellMovie = this.dellMovie.bind(this);
    this.openCreateWindow = this.openCreateWindow.bind(this);
    this.hideAddForm = this.hideAddForm.bind(this);

    this.state = {
      movies_list : [],
      addFormState : false
    };

  }


  render(){
    var movies_list = this.state.movies_list;
    var addFormState = this.state.addFormState;
    console.log(movies_list);

    var form = <div className="new-movie">

                <div className="ovarlay"></div>
                <form className="input-field" >
                  <h3>Add movie</h3>
                  <input type="text" ref="title" placeholder="Title"/>
                  <input type="text" ref='format' placeholder="Format"/>
                  <input type="number" ref='release_year' placeholder="Release year"/>
                  <input ref='stars' placeholder="Stars"/>
                  <button onClick={() => this.addNewMovie.bind(this)}>Add Star</button>
                  <input type='file'/>
                    <button onClick={function(){return this.hideAddForm()}}>Add Movie</button>
                    // <button onClick={() => this.hideAddForm}>Add Movie</button>
                </form>
              </div>

    return (
          <div>

            {this.state.movies_list.map((item, i) =>
              <div className="col-xs-3" key={i}>
                <div className="card-wrapper">
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
          <button onClick={this.hideAddForm()}>Add Movie</button>
          </div>

      );
  }
}
Home.propTypes = {
  name: React.PropTypes.string,
  age : React.PropTypes.number
}
