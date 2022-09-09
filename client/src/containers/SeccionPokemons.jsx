import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CardPokemon from '../components/CardPokemon';
import { getAllPokemons, setPokemons } from "../redux/actions";
import style from './SeccionPokemons.module.css';



export default function SeccionPokemons(props){
    const dispatch = useDispatch();
    const pokemons = useSelector( state => state.pokemons );
    const pokemonsDisplay = useSelector( state => state.pokemonsDisplay);
    const [index, setIndex] = useState(0);
    const [pag, setPag] = useState();
    const CardsPerPag= 12;

    useEffect(()=>{
        if(!pokemons){
            dispatch(getAllPokemons())
        } else {
            dispatch(setPokemons())
        }
        
    }, [dispatch]);


    useEffect(()=>{
        setPag(Math.ceil(pokemonsDisplay?.length/CardsPerPag))
    }, [pokemonsDisplay, pag]);


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
                { pokemons?.error? <span>{pokemons.error}</span>
                :pokemonsDisplay?.length? pokemonsDisplay.slice(index, index+CardsPerPag).map(pokemon => <CardPokemon key={pokemon.id} id={pokemon.id} name={pokemon.name.toUpperCase()} types={pokemon.types} image={pokemon.image} />)
                : <img  src='https://i.gifer.com/origin/0d/0dea0c59cbf084d981fc5b55643cb6e6.gif' className={style.loading} alt="" /> }
            </div>

            { <button disabled={index>0? false: true} onClick={handlePrev}>PREV</button> }

            {numberOfPag().map((el, i) => <button className={index+CardsPerPag === el*CardsPerPag? style.active:''} key={i} onClick={()=> handlePag(i)} >{el}</button>)}

            { <button disabled={pokemonsDisplay?.length - index > 12? false: true } onClick={handleNext}>NEXT</button> }

        </>
    )
}