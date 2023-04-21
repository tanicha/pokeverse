import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

function PokemonCard({ url, name }) {
  const [pokemon, setPokemon] = useState(null);

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

  return (
    <div>
    <Card style={{ width: '15rem' }}>
      <Card.Img src={sprites.front_default} />
      <Card.Body>
        <Card.Title className="text-center">{name.toUpperCase()}</Card.Title>
        <Card.Text as="div">
        <br></br>
          <h6>Abilities:</h6>
          <ul>
            {abilities.map(ability => (
              <li>{ability.ability.name}</li>
            ))}
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  );
}

export { PokemonCard };
