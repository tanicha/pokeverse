import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';


const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(pokeApi);
        const data = await res.json();
        setPokemonList(data.results)
        console.log(data.results)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="my-5">
    <div data-testid="app">
      <Navigation />
      <InputGroup type='button'size="default" className="mb-3 w-25 mx-auto">
        <FormControl
          placeholder="Search Pokemon"
          aria-label="sm"
          aria-describedby="inputGroup-sizing-sm"
          onChange={handleSearch}
        />
        <InputGroup.Text id="inputGroup-sizing-sm">Search</InputGroup.Text>
      </InputGroup>
      <Row className="my-4">
      {filteredPokemon.map((pokemon) => (
        <Col className="my-3"><PokemonCard name={pokemon.name} url={pokemon.url} /></Col>
      ))}
      </Row>
    </div>
    </Container>
  );
}

export { App };
