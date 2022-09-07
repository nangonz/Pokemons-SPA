import React from "react";
import style from './CardPokemon.module.css';
import pokeball from '../images/pokeball.svg';



export default function CardPokemon(props){
    return(
        <div className={`${style.align} ${style.bg}`} >
            <div>
                <h2>{props.name}</h2>
                <ul>
                    {props.types.map( (t,i) => <li key={i}>{t}</li>)}
                </ul>
            </div>
            <div>
                <img className={style.img} src={props.image || pokeball} alt="" />
            </div>
        </div>
    )
}