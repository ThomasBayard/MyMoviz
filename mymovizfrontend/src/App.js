import React, { Component } from 'react';
import {
  Row,
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import url from "./config";
import Movie from './Movie';


class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        isOpenNavBar: false,
        isOpenPopOver: false,
        viewOnlyLike: false,
        moviesCount: 0,
        moviesNameList: [],
        movies: [],
        moviesLiked: [],
      };
    }

  componentDidMount = () => {

    // URL => accès à mon back end via un FETCH
    fetch(`${url}/movies`) 

    .then(function(response){
      return response.json();

    }).then(function(data){
      console.log(data.movies)
      this.setState({movies: data.movies});

    }).catch(function(error){
      console.error(error);
    });

    fetch(`${url}/mymovies`)

    .then(function(response){
      return response.json();
    }).then(function(movies) {
      var moviesNameListCopy = movies.data.map((movie) => {
        return movie.title;
      });
      this.setState({
        moviesLiked: movies.data,
        moviesCount: movies.data.length,
        moviesNameList: moviesNameListCopy
      });
      console.log('ICI TOUS LES FILMS LIKES ==========>',this.state.moviesLiked);
    })
    
    .catch(function(error) {
      console.error(error);
    });
  };

  toggleNavBar = () => {
    this.setState({
      isOpenNavBar: !this.state.isOpenNavBar
    });
  }

  togglePopOver= () => {
    this.setState({
      isOpenPopOver: !this.state.isOpenPopOver
    });
  }

  handleClickLikeOn = () => {
    console.log("JE NE VOIS QUE LES FILMS LIKES")
    this.setState({
      viewOnlyLike: true
    })
  }

  handleClickLikeOff = () => {
    console.log("JE VOIS TOUS LES FILMS DISPONIBLES")
    this.setState({
      viewOnlyLike: false
    })
  }

  handleClick = (isLike, name) => {
    // AJOUT DE DONNEES =======> COPIE D'UN TABLEAU OBLIGATOIRE ! 
    var moviesNameListCopy = [...this.state.moviesNameList];

    // CONDITION SI LIKE ====> ENVOI DANS LA COPIE DU TABLEAU + COMPTEUR +1 + Changement de state !!!
    if (isLike) {
      moviesNameListCopy.push(name);
      this.setState({
        moviesCount: this.state.moviesCount+1,
        moviesNameList: moviesNameListCopy,
      })
    }
    // CONDITION SI DISLIKE =====> ON RETIRE LA DONNEE DU TABLEAU + COMPTEUR -1 + Changement de state !!!
    else {
      var index = moviesNameListCopy.indexOf(name)
      moviesNameListCopy.splice(index, 1);
      this.setState({
        moviesCount: this.state.moviesCount-1,
        moviesNameList: moviesNameListCopy,
      })
    }
  }

  render() {

    // MAPPING / BOUCLE SUR UNE LISTE DE FILMS 
    var movieList = this.state.movies.map((movie, i) => {
      var isLiked = false;
      for (var y = 0; y < this.state.moviesLiked.length; y++) {
        if (movie.id === this.state.moviesLiked[y].idMovieDB) {
          isLiked = true;
          break;
        }
      }
      return(<Movie key={i} movieName={movie.title} movieDesc={movie.overview} movieImg={movie.poster_path} displayOnlyLike={this.state.viewOnlyLike} handleClickParent={this.handleClick} idMovie={movie.id} isLiked={isLiked}/>)
    });

    //ORGANISATION SYNTHAXE DANS MOVIES LAST 
    let moviesLast = this.state.moviesNameList.slice(-3)
        if (this.state.moviesCount === 0) {
          moviesLast = "Aucun film sélectionné.";
        } else if (this.state.moviesCount > 3) {
          moviesLast = moviesLast.join(", ") + "...";
        } else {
          moviesLast = moviesLast.join(", ") + ".";
        }

    return (

      <div>

        <div style={{marginBottom: 90}}>
          <Navbar color="dark" dark expand="md" fixed="top">
            <span className="navbar-brand">
              <img src="./logo.png" width="30" height="30" className="d-inline-block align-top" alt="logo myMoviz"/>
            </span>
            <NavbarToggler onClick={this.toggleNavBar} />
            <Collapse isOpen={this.state.isOpenNavBar} navbar>
              <Nav className="" navbar>
                <NavItem>
                  <NavLink onClick={this.handleClickLikeOff} href="#" style={{color: "#FFFFFF"}}>Last Releases</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={this.handleClickLikeOn} href="#" style={{color: "#FFFFFF", marginRight: 10}}>My Movies</NavLink>
                </NavItem>
                <Button id="Popover1" onClick={this.togglePopOver} color="secondary">{this.state.moviesCount}{this.state.moviesCount > 1 ? ' films' : ' film'}</Button>
                  <Popover placement="bottom" isOpen={this.state.isOpenPopOver} target="Popover1" toggle={this.togglePopOver}>
                    <PopoverHeader>Derniers films</PopoverHeader>
                    <PopoverBody>{moviesLast}</PopoverBody>
                  </Popover>
              </Nav>
            </Collapse>
          </Navbar>
        </div>

        <Container>
          <Row>
            {movieList}
          </Row>
        </Container>

      </div>

    );
  }
}

export default App;