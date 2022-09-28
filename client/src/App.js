import { Route, Switch } from 'react-router-dom';
import SeccionPokemons from './containers/SeccionPokemons';
import Landing from './containers/Landing';
import PageNotFound from './containers/PageNotFound';
import PokemonDetail from './containers/PokemonDetail';
import FormCreate from './containers/FormCreate';
import Nav from './components/Nav';
import Footer from './components/Footer';


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
          <Footer/>
        </Route> 

        <Route exact path='/create'>
          <Nav/>
          <FormCreate/>
          <Footer/>
        </Route> 

        <Route exact path='/pokemons/:idPokemon' render={({match})=> <><Nav/><PokemonDetail match={match}/><Footer/></>}>
        </Route> 

        <Route>
          <Nav/>
          <PageNotFound/>
          <Footer/>
        </Route> 

      </Switch>
    </div>
  );
}

export default App;
