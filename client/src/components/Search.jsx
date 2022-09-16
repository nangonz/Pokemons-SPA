import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearDisplay, searchPokemon, setPokemons } from "../redux/actions";

export default function Search(props){

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
            dispatch(setPokemons())
        }
    }

    useEffect(()=>{
        return () => {
            dispatch(clearDisplay())
        }
    }, [])


    return(
        <div>
            <form onSubmit={(e)=> handleOnSubmit(e)}>
                <input name='name' type="search" onChange={(e)=>handleOnChange(e)} placeholder="Nombre del Pokemon..." autoComplete='off'/>
                <button type="submit">{input.length? "Search": "Search ALL"}</button>
            </form>
        </div>
    )
}