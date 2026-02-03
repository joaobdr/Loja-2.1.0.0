import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { Storage } from './Global/Storage';
import Rotas from './Rotas';



function App() {

  
  return (
      <BrowserRouter>
        <Storage>
          <Rotas />
        </Storage>
      </BrowserRouter>
  )
}

export default App
