import { useRoutes } from 'hookrouter';
import React from 'react';
import classes from './App.module.css'
import Routes from './Routes/Routes';

const App = () => {
    const routes = useRoutes(Routes)
    return routes
}

export default App