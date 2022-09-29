import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllPokemons } from "../redux/actions";
//styles
import style from "./Landing.module.css";
//images
import landingImage from '../images/logo.png';
import pokefire from '../images/pokefire.gif';
import ashPokemons from '../images/ashPokemons.gif';
import icoPoke from '../images/ico-pokeball.png';


export default function Landing(props){

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllPokemons());
    }, [dispatch]);
    
    return(
        <div className={style.flex}>
        <img className={style.fire} src={pokefire}></img>
        <img className={style.pokes} src={ashPokemons}></img>
            

            <div className={style.flexColumStart} >
                <h1 className={style.title}>HI, NICE TO SEE YOU HERE</h1>
                <div className={style.content}>
                    <div className={style.flexSpan}>
                        <img className={style.ico} src={icoPoke}/><span>Find your favourites Pokemons</span>
                    </div>
                    <div className={style.flexSpan}>
                        <img className={style.ico} src={icoPoke}/><span>Create your dreams Pokemons</span>
                    </div>
                    <div className={style.flexSpan}>
                        <img className={style.ico} src={icoPoke}/><span>Filter and sort as you wish</span>
                    </div>
                    <div className={style.flexSpan}>
                        <img className={style.ico} src={icoPoke}/><span>Learn more about them</span>
                    </div>
                </div>
                <h2 className={style.title}>LET'S HAVE FUN</h2>
                <div className="btnPrincipal indexZ"><Link to='/home'><span>GO</span></Link></div>
            </div>
            <div className={style.flexColum} >
                <img className={style.logo} src={landingImage} alt='landing logo'/>
            </div>
        {/* <img className={style.fireGif} src={pokefire}></img>
        <img className={style.ashPokemons} src={ashPokemons}></img> */}
        </div>
    )
}


