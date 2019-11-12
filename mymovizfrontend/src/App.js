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
    PopoverBody
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Movie from './Movie'

class App extends Component {

    constructor(props) {
        super(props);
        this.toggleNavBar = this.toggleNavBar.bind(this);
        this.togglePopOver = this.togglePopOver.bind(this);
        this.handleClickLikeOn = this.handleClickLikeOn.bind(this);
        this.handleClickLikeOff = this.handleClickLikeOff.bind(this);
        this.handleClick = this.handleClick.bind(this);
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

    toggleNavBar() {
        this.setState({
            isOpenNavBar: !this.state.isOpenNavBar
        });
    }

    togglePopOver() {
        this.setState({
            isOpenPopOver: !this.state.isOpenPopOver
        });
    }

    handleClick(isLike, name) {

        // Vérification click
        console.log("click détected from App");

        // Copy Tableau
        var moviesNameListCopy = [...this.state.moviesNameList];

        // Mise à jour compteur 
        if (!isLike) {

            moviesNameListCopy.push(name);

            this.setState({
                moviesCount: this.state.moviesCount + 1,
                moviesNameList: moviesNameListCopy
            })

        } else {

            var index = moviesNameListCopy.indexOf(name)
            moviesNameListCopy.splice(index, 1);

            this.setState({
                moviesCount: this.state.moviesCount - 1,
                moviesNameList: moviesNameListCopy
            })

        }
    }

    handleClickLikeOn() {
        console.log('Click detected on Mymovies');
        this.setState({
            viewOnlyLike: true,
        })
    }

    handleClickLikeOff() {
        console.log('Click detected on LastReleases');
        this.setState({
            viewOnlyLike: false,
        })
    }

    componentWillMount() {

        var ctx = this;

        // Avant l affichage de la page, fetch sur la BDD pour récuperer les films
        fetch('http://localhost:3000/movies')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {

                console.log('réponse du backend --->', data.movies)
                ctx.setState({ movies: data.movies });


            })
            .catch(function(error) {
                console.log('Request failed', error)
            });

        // Recherche des films "like" dans la BDD pour affichage
        fetch('http://localhost:3000/mymovies')
            .then(function(response) {
                return response.json();
            })
            .then(function(movies) {

                var moviesNameListCopy = movies.data.map((movie) => {
                    return movie.title;
                });
                ctx.setState({
                    moviesLiked: movies.data,
                    moviesCount: movies.data.length,
                    moviesNameList: moviesNameListCopy
                });

            })
            .catch(function(error) {
                console.log('Request failed ->', error)
            });
    }


    render() {

        var moviesNameList = this.state.moviesNameList
        var moviesLast;

        console.log(`Here is moviesLast : ${moviesLast}`)

        // (BEST) TECHNIQUE N°2 to display the last 3 movies we liked ------*

        let moviesLast = this.state.moviesNameList.slice(-3)
        if (this.state.moviesCount === 0) {
            moviesLast = "Aucun film sélectionné.";
        } else if (this.state.moviesCount > 3) {
            moviesLast = moviesLast.join(", ") + "...";
        } else {
            moviesLast = moviesLast.join(", ") + ".";
        }

        let movieList = [];
        for (var i = 0; i < moviesData.length; i++) {
            movieList.push( <
                Movie key = { i }
                movieName = { moviesData[i].name }
                movieDesc = { moviesData[i].desc }
                movieImg = { moviesData[i].img }
                />
            );
        }

        var movieList = this.state.movies.map((movie, i) => {

                // Comparaison Tableau BDD vs Etat des likes pour afficher les films likés
                var isLiked = false;
                for (var y = 0; y < this.state.moviesLiked.length; y++) {
                    if (movie.id === this.state.moviesLiked[y].idMovieDB) {
                        isLiked = true;
                        break;
                    }
                }

                return ( < Movie key = { i }
                    movieName = { movie.title }
                    movieDesc = { movie.overview }
                    movieImg = { movie.poster_path }
                    idMovie = { movie.id }
                    movieLiked = { isLiked }
                    displayOnlyLike = { this.state.viewOnlyLike }
                    handleClickParent = { this.handleClick }
                    />)
                });
        }

        return (

            <
            div >

            { /* Header --NAVBAR */ } <
            div style = {
                { marginBottom: 90 }
            } >
            <
            Navbar color = "dark"
            dark expand = "md"
            fixed = "top" >
            <
            span className = "navbar-brand" >
            <
            img src = "./logo.png"
            width = "30"
            height = "30"
            className = "d-inline-block align-top"
            alt = "logo myMoviz" / >
            <
            /span> <
            NavbarToggler onClick = { this.toggleNavBar }
            /> <
            Collapse isOpen = { this.state.isOpenNavBar }
            navbar >
            <
            Nav className = ""
            navbar >
            <
            NavItem >
            <
            NavLink href = "#"
            style = {
                { color: "#FFFFFF" }
            }
            onClick = { this.handleClickLikeOff } > Last Releases < /NavLink> < /
            NavItem > <
            NavItem >
            <
            NavLink href = "#"
            style = {
                { color: "#FFFFFF", marginRight: 10 }
            }
            onClick = { this.handleClickLikeOn } > My Movies < /NavLink> < /
            NavItem > <
            Button id = "Popover1"
            onClick = { this.togglePopOver }
            color = "secondary" > { this.state.moviesCount }
            films < /Button> <
            Popover placement = "bottom"
            isOpen = { this.state.isOpenPopOver }
            target = "Popover1"
            toggle = { this.togglePopOver } >
            <
            PopoverHeader > Derniers films < /PopoverHeader> <
            PopoverBody > { moviesLast } < /PopoverBody> < /
            Popover > <
            /Nav> < /
            Collapse > <
            /Navbar> < /
            div >

            <
            Container >
            <
            Row > { movieList } <
            /Row> < /
            Container >

            <
            /div>

        )
    };

    export default App;
