import './App.css';
import { Route, Switch } from 'react-router-dom';
import Nav from './containers/Nav';
import SeccionPokemons from './containers/SeccionPokemons';
import Landing from './components/Landing';
import PageNotFound from './containers/PageNotFound';
import PokemonDetails from './components/PokemonDetails';
import FormCreate from './components/FormCreate';


function App() {
  return (
    
    <div className="App">
      <Switch>

        <Route exact path='/'>
          <Landing/>
        </Route>

        <Route exact path='/home'>
          <Nav/>
          <SeccionPokemons/>
        </Route> 

        <Route exact path='/create'>
          <FormCreate/>
        </Route> 

        <Route exact path='/pokemons/:idPokemon' render={({match})=> <PokemonDetails match={match}/>}>
        </Route> 

        <Route>
          <PageNotFound/>
        </Route> 

      </Switch>
    </div>
  );
}

export default App;
