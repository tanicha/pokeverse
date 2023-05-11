import React from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Home } from '../src/routes/Home'
import { PokemonDetails } from '../src/routes/PokemonDetails'
import { Layout } from '../src/routes/Layout'
import { FavoritesProvider } from './FavoritesProvider';

const router = createBrowserRouter([
  { path: "/", element: <Layout/>,
    children: [
      { path: "/", element: <Home/> },
      { path: "/:name", element: <PokemonDetails/>}
    ]
}
])

function App() {
  return (
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  );
}

export { App }; 