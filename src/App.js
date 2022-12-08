import './App.css'; 

import { ListProduct } from './ListProduct';
import NavBar from './NavBar';
import {BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import HookListProduct from './HookListProduct';
import Home from './Home';


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' exact  element={<Home/>} />
        <Route path='/Product' element={<ListProduct/>} />
        <Route path='/hook' element={<HookListProduct/>} />
      </Routes>
    </Router> 
   
  );
}

export default App;
