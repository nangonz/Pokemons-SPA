import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDisplay, searchPokemon, setPokemons } from "../redux/actions";

export default function Search(props){

    const pokemons = useSelector(state=> state.pokemons)
    const [input, setInput] = useState("")
    const dispatch = useDispatch()

    const handleOnChange = (e) =>{
        setInput(e.target.value)
    };

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        if(input.length){
            dispatch(clearDisplay())
            dispatch(searchPokemon(input.toLowerCase()))
        } else {
            pokemons && dispatch(setPokemons())
        }
        setInput("")
    }

    


    return(
        <div>
            <form onSubmit={(e)=> handleOnSubmit(e)}>
                <input value={input} name='name' type="search" onChange={(e)=>handleOnChange(e)} placeholder="Nombre del Pokemon..." autoComplete='off'/>
                <button type="submit">{input.length? "Search": "Search ALL"}</button>
            </form>
        </div>
    )
}