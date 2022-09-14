import { SET_POKEMONS, CLEAR_DISPLAY, GET_ALL_POKEMONS, SEARCH_POKEMON, GET_TYPES, CREATE_POKEMON } from "./actions.js";

const stateInitial = {};

export default function rootReducer (state=stateInitial, action){
    switch (action.type){
        case GET_ALL_POKEMONS:
            return {
                ...JSON.parse(JSON.stringify(state)),
                pokemons: action.payload,
                pokemonsDisplay: action.payload
            }

        case GET_TYPES:
            return {
                ...JSON.parse(JSON.stringify(state)),
                pokemonsTypes: action.payload
            }

        case SET_POKEMONS:
            return {
                ...JSON.parse(JSON.stringify(state)),
                pokemonsDisplay: JSON.parse(JSON.stringify(state.pokemons))
        }

        case SEARCH_POKEMON:
            return {
                ...JSON.parse(JSON.stringify(state)),
                pokemonsDisplay: action.payload // recordar que en seccionPolemon aplicamos .slice por eso []
            }

        case CLEAR_DISPLAY:
            return {
                ...JSON.parse(JSON.stringify(state)),
                pokemonsDisplay: []
            }

        case CREATE_POKEMON:
            return {
                ...JSON.parse(JSON.stringify(state)),
                pokemonsDisplay: action.payload
            }

        default: return state;
    }
}
