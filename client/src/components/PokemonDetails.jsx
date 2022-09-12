import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import pokeball from '../images/pokeball.svg'

export default function PokemonDetails ({match}){

    const idPokemon = match.params.idPokemon;
    const [PokeDetails, setPokeDetails] = useState();
    const findedPokemon = useSelector(state => state.pokemons?.find(p => p.id===idPokemon));


    useEffect(()=>{
        if(!findedPokemon){
            fetch(`http://localhost:3001/pokemons/${idPokemon}`)
            .then(response => response.json())
            .then(data => setPokeDetails(data))
            .catch(error => console.log(error))
        } else {
            setPokeDetails(findedPokemon);
        }
    },[findedPokemon, idPokemon])


    return (
        <div>
            {PokeDetails?
            <>
                <h1>ID: {PokeDetails.id}</h1>
                <h1>{PokeDetails.name.toUpperCase()}</h1>
                <img src={PokeDetails.image || pokeball} alt={`Pokemon ${idPokemon}`} />
            </>
            : <span>Cargando Detalles</span>
            }
        </div>
    )

}