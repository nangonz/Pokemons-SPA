import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CardPokemon from '../components/CardPokemon';
import { getAllPokemons, setPokemons } from "../redux/actions";
import style from './SeccionPokemons.module.css';
import pikachuGif from '../images/nan1.gif'
import Nav from "./Nav";
import Filter from "../components/Filter";



export default function SeccionPokemons(props){
    const dispatch = useDispatch();
    const pokemons = useSelector( state => state.pokemons );
    const pokemonsDisplay = useSelector( state => state.pokemonsDisplay);
    const [index, setIndex] = useState(0);
    const [pag, setPag] = useState();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const layoutSeccion= 12;

    useEffect(()=>{
        if(!pokemons){
            dispatch(getAllPokemons())
        } else {
            dispatch(setPokemons())
        }
        
    }, [dispatch, isFilterOpen]);


    useEffect(()=>{
        const newPag = Math.ceil(pokemonsDisplay?.length/layoutSeccion);
        if(newPag < pag){
            setIndex(0)
        }
        setPag(newPag)
    }, [pokemonsDisplay, pag]);


    function paging(){
        const arrButton = [];
        for(let i=1; i<=pag ; i++){
            arrButton.push(i);
        }
        return arrButton;
    };

    const handlePrev = () =>{
        setIndex((prevState)=> prevState - layoutSeccion);
    };

    const handlePag = (i) =>{
        setIndex(i * layoutSeccion);
    };

    const handleNext = () =>{
        setIndex(prevState=> prevState + layoutSeccion)
    }


    return(
        <>
            <Nav showFilter={isFilterOpen} onFilter={()=> setIsFilterOpen(!isFilterOpen)} />
            <div className={style.flex}>
                <div>
                    {isFilterOpen && <Filter/>}
                </div>
                <div className={style.seccion}>
                    { pokemons?.error? <span>{pokemons.error}</span>
                    :pokemonsDisplay?.error? <span>Pokemon not found, try again!</span>
                    :pokemonsDisplay?.length? pokemonsDisplay.slice(index, index+layoutSeccion).map(pokemon => <CardPokemon key={pokemon.id} id={pokemon.id} name={pokemon.name} Types={pokemon.Types} image={pokemon.image} />)
                    : <img src={pikachuGif} className={style.loading} alt="" /> }
                </div>
            </div>

            { <button disabled={index>0? false: true} onClick={handlePrev}>PREV</button> }

            {paging().map((el, i) => <button className={index+layoutSeccion === el*layoutSeccion? style.active:''} key={i} onClick={()=> handlePag(i)} >{el}</button>)}

            { <button disabled={pokemonsDisplay?.length - index > 12? false: true } onClick={handleNext}>NEXT</button> }

        </>
    )
}