import React from "react";
import style from './CardPokemon.module.css';
import pokeball from '../images/pokeball.svg';
import { Link } from "react-router-dom";



export default function CardPokemon(props){
    return(
        <Link style={{'textDecoration':'none'}} to={`/pokemons/${props.id}`}>
            <div className={`${style.align} ${style.bg}`} >
                <div>
                    <h2>{props.name.toUpperCase()}</h2>
                    <ul>
                        {props.Types.map( (t,i) => <li key={i}>{t.name}</li>)}
                    </ul>
                </div>
                <div>
                    <img className={style.img} src={props.image || pokeball} alt="" />
                </div>
            </div>
        </Link>
    )
}