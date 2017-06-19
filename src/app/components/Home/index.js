// HOME PARE COMPONENT

import React from "react";
import {CardView} from './CardView/'




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

    var e = this.refs.iniFile.files[0];
    // var file=fopen(getScriptPath(e),0);
    console.log(e);
    // console.log(readText(e));


    // var reader = new FileReader();
    // reader.onload = function(e) {
    //   var contents = e;
    //   displayContents(contents);
    // };
    // reader.readAsText(file);

  }

  addNewMovie(event) {
    event.preventDefault();
    let title = this.refs.title.value;
    let release_year = this.refs.release_year.value;
    let format = this.refs.format.value;
    let stars = this.refs.stars.value;
    let iniFile = this.refs.iniFile.value;

    $.post("http://localhost:3000/addmovie",
      {
        title : title,
        release_year : release_year,
        format : format,
        stars : stars
      },
        function(result){
            console.log('ddddd');
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

  constructor (props){
    super(props);

    this.dellMovie = this.dellMovie.bind(this);
    this.openCreateWindow = this.openCreateWindow.bind(this);
    this.hideAddForm = this.hideAddForm.bind(this);
    this.addNewMovie = this.addNewMovie.bind(this);
    this.loadINI = this.loadINI.bind(this);
    this.describeCard = this.describeCard.bind(this)

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
                  <input type="text" ref='format' placeholder="Format"/>
                  <input type="number" ref='release_year' placeholder="Release year"/>
                  <input ref='stars' placeholder="Stars"/>
                  <button onClick={this.addNewMovie}>Add Star</button>
                  <input ref="iniFile" onChange={this.loadINI} type='file'/>
                  <button >Add Movie</button>
                </form>
                <button onClick={this.hideAddForm}>Add Movie</button>
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
