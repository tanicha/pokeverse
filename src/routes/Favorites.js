import React, { useContext } from 'react';
import { FavoritesContext }  from '../FavoritesProvider';

function Favorites(){
    const { favorites } = useContext(FavoritesContext)
    console.log('favorites:', favorites)

    return ( <>
        { favorites.map((favorite) => 
            <PokemonCard key={favorite} name={favorite}/>
        )}
    </>)
}

export { Favorites };