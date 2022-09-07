import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CardPokemon from '../components/CardPokemon';
import { getPokemons } from "../redux/actions";
import style from './SeccionPokemons.module.css';



export default function SeccionPokemons(props){
    const dispatch = useDispatch();
    const pokemons = useSelector( state => state.pokemons );
    const [index, setIndex] = useState(0);
    const [pag, setPag] = useState();
    const CardsPerPag= 12;

    useEffect(()=>{
        dispatch(getPokemons())
    }, [dispatch]);


    useEffect(()=>{
        setPag(Math.ceil(pokemons?.length/CardsPerPag))
    }, [pokemons, pag]);


    function numberOfPag (){
        const arrButton = [];
        for(let i=1; i<=pag ; i++){
            arrButton.push(i);
        }
        return arrButton;
    };

    const handlePrev = () =>{
        setIndex((prevState)=> prevState - CardsPerPag);
    };

    const handlePag = (i) =>{
        setIndex(i * CardsPerPag);
    };

    const handleNext = () =>{
        setIndex(prevState=> prevState + CardsPerPag)
    }


    return(
        <>
            <div className={style.seccion}>
                {pokemons? pokemons.slice(index, index+CardsPerPag).map(pokemon => <CardPokemon key={pokemon.id} name={pokemon.name.toUpperCase()} types={pokemon.types} image={pokemon.image} />): <img className={style.loading} src='https://i.gifer.com/origin/0d/0dea0c59cbf084d981fc5b55643cb6e6.gif' alt="" />}
            </div>

            {index > 0? <button onClick={handlePrev}>PREV</button> : <></>}
            {numberOfPag().map((el, i) => <button key={i} onClick={()=> handlePag(i)} >{el}</button>)}
            {pokemons?.length - index > 12? <button onClick={handleNext}>NEXT</button>: <></>}

        </>
    )
}