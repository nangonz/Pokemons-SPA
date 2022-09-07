import './App.css';
import { Route, Link } from 'react-router-dom';
import landingImage from './images/pokemonEditado.png'
import Nav from './containers/Nav';
import SeccionPokemons from './containers/SeccionPokemons';


function App() {
  return (
    
    <div className="App">
      <Route exact path='/'>
        <Link to='/home'><button>home</button></Link>
       <h1>Henry Pokemon</h1>
       <img src={landingImage} alt='Landing Background'/>
      </Route>

      <Route exact path='/home'>
        <Nav/>
        <SeccionPokemons/>
      </Route> 

      <Route exact path='/create'>
        <h1>Crea tu propio Pokemon</h1>
      </Route> 

      <Route exact path='/pokemon/:idPokemon'>
        <h1>Pokemon's Details</h1>
      </Route> 
    </div>
  );
}

export default App;
