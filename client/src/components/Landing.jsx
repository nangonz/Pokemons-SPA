import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPokemons } from '../redux/actions';
import landingImage from '../images/pokemonEditado.png';
import style from './Landing.module.css';



export default function Landing(props){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPokemons())
    }, [dispatch]);


    return(
        <div className={style.landing_Sup}>
            <div className={style.landing_image_div} >
                <img className={style.landing_img} src={landingImage} alt='Landing Background'/>
            </div>

            <div className={style.landing_text_div} >
                <h1>👋🏻Bienvenido!</h1>
                <div>
                    <p>Aqui encontraras tus pokemons favoritos, podras conocer sus stats,
                        sus typos y mas. Vamos a divertirnos!</p>
                </div>
                <Link to='/home'><button className={style.landing_text_div_homeButton}>home</button></Link>
                
            </div>
        
        </div>
    )
}