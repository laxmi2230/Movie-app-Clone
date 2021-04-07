import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MoviesList from './components/MoviesList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchvalue, setSearchValue] = useState('');
  
  const getMovieRequest = async (searchvalue) => {
    const url = `http://www.omdbapi.com/?apikey=5fe66aa6&s=${searchvalue}`;
  
    const response = await fetch(url);
    const responseJSON = await response.json();

    if(responseJSON.Search)
    {
    setMovies(responseJSON.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchvalue);
  }, [searchvalue]);

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  }

const addFavouriteMovie = (movie) => {
  const newFavouriteList = [...favourites, movie]
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);
}

const removeFavouriteMovie = (movie) => {
  const newFavouriteList = favourites.filter(
    (favourite) => favourite.imdbID !== movie.imdbID
  );

  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);
  
};

  return (
    <div container-fluid movie-app>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchvalue={searchvalue} setSearchValue={setSearchValue}/>
      </div>
    <div className='row'>
    <MoviesList movies = {movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourites}/>
    </div>
    <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
    </div>
    <div className='row'>
    <MoviesList movies = {favourites} handleFavouritesClick={ removeFavouriteMovie} favouriteComponent={RemoveFavourites}/>
    </div>
    </div>
  );
}

export default App;
