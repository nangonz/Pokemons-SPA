const { Router } = require('express');
const { getPokemons, getPokemonsById, getTypes, postPokemon } = require('../controllers/pokemonsController.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', getPokemons);


router.get('/pokemons/:idPokemon', getPokemonsById);


router.get('/types', getTypes);


router.post('/pokemons', postPokemon);


module.exports = router;
