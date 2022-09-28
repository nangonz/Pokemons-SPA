import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardPokemon from "../components/CardPokemon";
import Filter from "../components/Filter";
import Search from "../components/Search";
import { clearDisplay, getAllPokemons, setPokemons } from "../redux/actions";
import style from "./SeccionPokemons.module.css"
import loadingPikachu from "../images/loadingPikachu.gif"
import errorPikachu from "../images/404-error-pokegif.gif"

export default function SeccionPokemon(props){
    const dispatch= useDispatch();
    const pokemons= useSelector(state=>state.pokemons);
    const pokemonsDisplay = useSelector(state=>state.pokemonsDisplay);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [pag, setPag] = useState();
    const layoutSeccion= 12;

    function paging(){
        const arrButton = []
        for(let i=1;i<=pag;i++){
            arrButton.push(i)
        }
        return arrButton;
    }

    const handleNext = ()=>{
        setIndex((prevState)=>prevState+layoutSeccion)
    }
    const handlePrev = ()=>{
        setIndex((prevState)=>prevState-layoutSeccion)
    }
    const handlePag = (i)=>{
        setIndex(i*layoutSeccion)
    }

    useEffect(()=>{
        if(!pokemons){
            dispatch(getAllPokemons());
        } else {
            dispatch(setPokemons());   
        }

        return ()=>{
            dispatch(clearDisplay());
        }

    }, [dispatch]);

    useEffect(()=>{
        const newPag= Math.ceil(pokemonsDisplay?.length/layoutSeccion)
        if(newPag<pag){
            setIndex(0);
        }
        setPag(newPag);
    }, [pokemonsDisplay]);

    return (
        <>
        <div className={style.flex}>
            
                {isFilterOpen && pokemonsDisplay &&
                <div className={style.filter}><Filter /></div>
                }
            
            <div className={style.flexcolum}>
                <div className={style.fsnav}>
                    {pokemonsDisplay?.length>1 || isFilterOpen? <button onClick={()=>setIsFilterOpen(!isFilterOpen)}>
                        {isFilterOpen? "Close Filter" : "Filter / Sort" }
                    </button>: <></>}
                    <Search />
                </div>
                <div className={style.seccion}>
                    { pokemons?.error?<span>{pokemons.error}</span> 
                    :pokemonsDisplay?.error? <div><img src={errorPikachu} alt="errorImg"/><span className={style.span}>Pokemon not found, try again!</span></div>
                    :pokemonsDisplay?.length? pokemonsDisplay.slice(index,index+layoutSeccion).map(pokemon=><CardPokemon key={pokemon.id} id={pokemon.id} image={pokemon.image} Types={pokemon.Types} name={pokemon.name}/>) 
                    : <div><img src={loadingPikachu} alt="loadingImg"/><span className={style.span}>loading</span></div>}
                </div>
                <div>
                    {<button disabled={index>0?false:true} onClick={handlePrev}>Prev</button>}
                    {paging().map((b,i)=><button className={index+layoutSeccion===b*layoutSeccion?style.active:""} key={i} onClick={()=>handlePag(i)}>{b}</button>)}
                    {<button disabled={pokemonsDisplay?.length-index>12?false:true} onClick={handleNext}>Next</button>}
                </div>
            </div>
        </div>
        </>
    )
}