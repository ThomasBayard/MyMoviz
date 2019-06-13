import React, { Component } from 'react';
import {
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default class Movie extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      like: this.props.isLiked
    }
  }

  handleClick(){
    var isLike = !this.state.like;
    this.setState({
       like: isLike
     });
    if (isLike) {
      // We want to save a movie in our db
      // Here, we are using ES6 syntax, so we do not need to store this in ctx.
      fetch('http://localhost:3000/mymovies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `title=${this.props.movieName}&overview=${this.props.movieDesc}&poster_path=${this.props.movieImg}&idMovieDB=${this.props.idMovie}`
      }).catch((error) => {
        console.error(error);
      });
    } else {
      // Here we want to delete a movie in our database
      fetch(`http://localhost:3000/mymovies/${this.props.movieId}`, {
        method: 'DELETE'})
        .catch((error) => {
        console.error(error);
      });
    }
    this.props.handleClickParent(isLike, this.props.movieName);
}



  render(){

    var styleHeart = {
      color: '#F7F7F7',
      position: 'absolute',
      top: '5%',
      left: '80%',
      cursor: 'pointer',
    }

    // Depending if this.state.like is true or not, we want to modify the key "color" of our style object.
    if(this.state.like){
      styleHeart.color = '#fc6861';
    }

    // We need to check if we have clicked on LastReleases (displayOnlyLike = false) or on My Movies (displayOnlyLike = true) + if the film is liked or not in order to display it
    var display = null;
    if(this.props.displayOnlyLike && !this.state.like) {
      display = 'none'
    }

    return(

          <Col xs="12" sm="6" md="4" lg="3" style={{display}}>
            <div style={{marginBottom:30}}>
              <Card>
                <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w500/${this.props.movieImg}`} alt="Card image cap" style={{minHeight: 380}} />
                <FontAwesomeIcon onClick={this.handleClick} size="2x" style={styleHeart} icon={faHeart} />
                  <CardBody style={{height: 250}}>
                    <CardTitle>{this.props.movieName}</CardTitle>
                    <CardText>{this.props.movieDesc.substr(0, 90) + ' ...'}</CardText>
                  </CardBody>
                </Card>
            </div>
          </Col>

    )
  }
}
