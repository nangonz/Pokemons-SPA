import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearSearch, searchPokemon } from "../redux/actions";

export default function Search(props){

    const [input, setInput] = useState()
    const dispatch = useDispatch()

    const handleOnChange = (e) =>{
        setInput(e.target.value)
    };

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        dispatch(searchPokemon(input.toLowerCase()))
    }

    useEffect(()=>{
        return () => {
            dispatch(clearSearch())
        }
    }, [])


    return(
        <div>
            <form onSubmit={(e)=> handleOnSubmit(e)}>
                <input name='name' type="search" onChange={(e)=>handleOnChange(e)} placeholder="Nombre del Pokemon..." />
                <button type="submit">Buscar</button>
            </form>
        </div>
    )
}