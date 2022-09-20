import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllPokemons } from '../redux/actions';
import landingImage from '../images/pokemonEditado.png';
import ashPokemons from '../images/ashPokemons.gif'
import pokefire from '../images/pokefire.gif'




import style from './Landing.module.css';



export default function Landing(props){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllPokemons())
    }, [dispatch]);


    return(
        <div className={style.landing_Sup}>
            <div className={style.landing_image_div} >
                <img className={style.landing_img} src={landingImage} alt='Landing Background'/>
            </div>

            <div className={style.landing_text_div} >
                <h1 className={style.landing_h1}>👋🏻Bienvenido!</h1>
                <div className={style.landing_p_div}>
                    <p>Aqui encontraras tus pokemons favoritos, podras conocer sus stats,
                        sus tipos y mas. <br /><b>Vamos a divertirnos!</b></p>
                    <svg>
                        <rect x="0" y="0" fill="none"></rect>
                    </svg>
                </div>
                <Link to='/home'><button className={style.landing_text_div_homeButton}>GO</button></Link>
                
            </div>
            <img className={style.fireGif} src={pokefire} alt="" />
            <img className={style.ashPokemons} src={ashPokemons} alt="" />
            

        
        </div>
    )
}