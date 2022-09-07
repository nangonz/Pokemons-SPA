const { Router } = require('express');
const axios = require('axios');
const { Tipo, Pokemon } = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', async (req, res)=>{
    const { name } = req.query;
    if (name) {
        try {
            const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${ name }`)
            return res.json(data);
            
        } catch (error) {
            const pokemonFind = await Pokemon.findOne({ where: {name: name}});
            if (pokemonFind) {
                return res.json(pokemonFind);
            } else {
                return res.status(404).send('Pokemon not found');
            }
            
        }
    }

    const { data: {results: pokemons}} = await axios('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40');
    if(!pokemons) return res.status(404).send({error: 'Pokemons not found'});
    const promises = pokemons.map(p => axios(p.url)); // arreglo de promesas
    const PokeFullData = await Promise.all(promises); // Los datos que quiero estan en data de la respuesta ax
    const PokeDetails = PokeFullData.map(p => {
        return {
            id: p.data.id,
            name: p.data.name,
            types: p.data.types.map(t => t.type.name),
            image: p.data.sprites.other.dream_world.front_default
        }
    })

    res.json(PokeDetails);
});


router.get('/pokemons/:idPokemon', async (req, res)=>{
    const { idPokemon } = req.params;
    try {
        const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
        return res.json({
            id: data.id,
            name: data.name,
            types: data.types, // arreglo contiene type
            image: data.sprites.other.dream_world.front_default,
            height: data.height,
            weight: data.weight,
            hp: data.stats.find(e => e.stat.name === 'hp').base_stat,
            attack: data.stats.find(e => e.stat.name === 'attack').base_stat,
            defense: data.stats.find(e => e.stat.name === 'defense').base_stat,
            speed: data.stats.find(e => e.stat.name === 'speed').base_stat
        });

    } catch (error) {
        const regexUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if(regexUUID.test(idPokemon)){
            const pokeFind = await Pokemon.findByPk(idPokemon);
            if(pokeFind) return res.json(pokeFind)
        }
        return res.status(404).send("Pokemon not Found");
    }
});


router.get('/types', async (req, res)=>{
    const dbTypes = await Tipo.findAll(); // Si aun no he guardado en mi DB los tipos sera un arr vacio
    if(dbTypes.length) return res.json(dbTypes);
    const { data: {results: tipos}} = await axios('https://pokeapi.co/api/v2/type');
    const promises = tipos.map(tipo => Tipo.create({name: tipo.name}));
    await Promise.all(promises);
    res.json(tipos);
});


router.post('/pokemons', async (req, res)=>{
    const newPokemon = req.body;
    if(newPokemon) {
        const pokemon = await Pokemon.create(newPokemon);
        await pokemon.setTipos(newPokemon.types) // arreglo de tipos
        res.json(pokemon)
    }
});


module.exports = router;
