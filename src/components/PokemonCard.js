import React, { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../FavoritesProvider';
import { Button } from 'react-bootstrap';

function PokemonCard({ url, name }) {
  const [pokemon, setPokemon] = useState(null);
  const { addFavorite } = useContext(FavoritesContext);

 useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setPokemon(data)
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPokemonData();
  }, [url]) 

  if (!pokemon) {
    return <p>Fetching Pokemon...</p>;
  }

  const { sprites , abilities } = pokemon;

  const handleAddToFavorites = (event) => {
    event.preventDefault();
    addFavorite(name);
    console.log('added to favorites');
  };

  return ( <>
    <div>
    <Card style={{ width: '15rem' }}>
      <Card.Img src={sprites.front_default} />
      <Card.Body>
        <Card.Title className="text-center"><Link to={`/${name}`}>{name}</Link></Card.Title>
        <Card.Text as="div">
        <br></br>
          <h6>Abilities:</h6>
          <ul>
            {abilities.map(ability => (
              <li>{ability.ability.name}</li>
            ))}
          </ul>
        </Card.Text>
        <Button variant='primary' onClick={handleAddToFavorites}>
            Add to Deck
        </Button>
      </Card.Body>
    </Card>
    </div>
  </>);
}

export { PokemonCard };
