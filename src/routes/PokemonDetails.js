import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PokemonDetails(){
    const [pokemon, setPokemon] = useState(null);

    const params = useParams(); 

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
                const data = await res.json();
                console.log('data of pokemon' + data)
                setPokemon(data)
            } catch (error) {
                console.log(error)
                setPokemon(null)
            }
        }
    fetchPokemon();
    }, [params.name])

    if (!pokemon) {
        return <>Loading...</>;
    }

    const { sprites } = pokemon;

    const imgStyle = {
        border: "solid 1px black",
        width: "15em",
        height: "15em",
    }

    return (
        <div>
            <img src={sprites.front_default} style={ imgStyle }/>
            <h1><ins>{pokemon.name}</ins></h1>
            <h5>Height: {pokemon.height}</h5>
            <h5>Weight: {pokemon.weight}</h5>
            <h5>Abilities:</h5>
                <p>{/* {pokemon.abilites.map(ability => <li>{ability.ability.name}</li>)} */} 
                {pokemon.abilities.map(ability => <li key={ability.ability.name}>{ability.ability.name}</li>)}</p>
            <h5> Types: </h5>
                <p>{pokemon.types.map(type => <li key={type.type.name}>{type.type.name}</li>)}</p>
            <h5> Stats: </h5>
                <p>{pokemon.stats.map(stat => <li key={stat.stat.name}>{stat.base_stat + "  " + stat.stat.name}</li>)}</p>
        </div>
    )
}

export { PokemonDetails };