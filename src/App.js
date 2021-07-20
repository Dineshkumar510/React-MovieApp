import axios from 'axios';
import React, {useState} from 'react';
import styled from 'styled-components';
import MovieComponent from './Components/MovieComponent';
import MovieInfoComponent from './Components/MovieInfoComponent';
export const API_KEY = "c9eb6503";

const Container = styled.div `
 display: flex;
 flex-direction: column;
 `;

const Header = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 background-color: black;
 color: white;
 align-items: center;
 padding: 10px;
 font-size: 25px;
 font-weight: bold;
 box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MovieImage = styled.img `
  width: 48px;
  height: 48px;
  margin: 15px;
`; 

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 40%;
  background-color: white;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
`;

const NotFound = styled.img`
  width: 150px;
  height: 150px;
  margin: 150px;
  opacity: 40%;
`;


function App() {

  const [SearchQuery, UpdateSearchQuery] = useState("");
  const[movieList, updateMovieList] = useState([]);
  const[selectedMovie, onMovieSelected] = useState();
  const[timeoutId, updateTimeoutId] = useState();

  const fetchData = async(searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
      );
    updateMovieList(response.data.Search);
  }

  const onTextChange = (e) => {
    onMovieSelected("")
    clearTimeout(timeoutId);
    UpdateSearchQuery(e.target.value);
    const timeout = setTimeout(()=> fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
      <Container>
              <Header>
                  <AppName> 
                    <MovieImage src="/Movie-Icon.png"/>
                    Movie-App
                  </AppName>
                  <SearchBox>
                    <SearchIcon src="/SearchIcon.png"/>
                    <SearchInput 
                    placeholder="Search Movie..." 
                    value ={SearchQuery}
                    onChange= {onTextChange}
                    />
                  </SearchBox>
              </Header>
              
              {selectedMovie && 
                <MovieInfoComponent 
                selectedMovie={selectedMovie}
                onMovieSelected={onMovieSelected}
                />}

                  <MovieListContainer>
                        {movieList ?  (
                          movieList.map((movie, index)=> (
                            <MovieComponent 
                              key={index} 
                              movie={movie} 
                              onMovieSelected={onMovieSelected}
                              />
                              ))
                              ) : (
                                <NotFound src= "/Movie-Icon.png" />
                              )}
                  </MovieListContainer>
      </Container>  
  );
}

export default App;
