import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearSearch, searchPokemon } from "../redux/actions";

export default function Search(props){

    const [input, setInput] = useState()
    const dispatch = useDispatch()

    const handleOnChange = (e) =>{
        setInput(e.target.value)
    };

    const handleOnClick = () =>{
        dispatch(searchPokemon(input.toLowerCase()))
    }

    useEffect(()=>{
        return () => {
            dispatch(clearSearch())
        }
    }, [])


    return(
        <div>
            <input name='name' type="text" onChange={(e)=>handleOnChange(e)} placeholder="Nombre del Pokemon..." />
            <button onClick={handleOnClick}>Buscar</button>
        </div>
    )
}