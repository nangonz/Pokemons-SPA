import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearDisplay, createPokemon, getAllPokemons, getTypes } from "../redux/actions";
import Modal from "./Modal";
import style from "./FormCreate.module.css";
import validate from "../services/validators";
import pokemonMasterOak from "../images/pokemonMasterOak.png";
import pokedexTopHalf from "../images/pokedexTopHalf.png";
import pokedexBottomHalf from "../images/pokedexBottomHalf.png";


export default function FormCreate(props){

    const history = useHistory()
    const pokemonsTypes = useSelector(state =>state.pokemonsTypes)
    const pokemonsDisplay = useSelector(state => state.pokemonsDisplay)
    const dispatch= useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [error, setError] = useState({
        disabled: true
    })
    const [creation, setCreation] = useState({
        name:"",
        weight: "",
        height: "",
        image: undefined,
        hp: 30,
        attack: 10,
        defense: 10,
        speed: 10,
        Types: [],
    });

    useEffect(()=>{
        if(!pokemonsTypes){
            dispatch(getTypes());
        }
        return ()=> dispatch(getAllPokemons())
    },[dispatch])

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        dispatch(createPokemon(creation))
    }

    const handleOnChange = (e)=>{
        setCreation((prevState)=>{
            const newState = {
                ...prevState,
                [e.target.name] : e.target.value
            }
            setError(validate(newState))
            return newState
        })
    }

    const handleOnClick = (e)=>{
        if(e.target.checked){
            setCreation((prevState)=>{
                const newState = {
                    ...prevState,
                    Types: [...prevState.Types, e.target.value]
                }
                setError(validate(newState))
                return newState
            })
        } else {
            setCreation((prevState)=>{
                const newState = {
                    ...prevState,
                    Types: prevState.Types.filter(type=>type!==e.target.value)
                }
                setError(validate(newState))
                return newState
            })
        }
    }


    const handleOnClose = () =>{
        setIsModalOpen(false)
        setError({
            disabled: true
        })
        dispatch(clearDisplay())
        setCreation((prevState)=>{
            return {
                ...prevState,
                name: "",
                weight: "",
                height: "",
                image: undefined,
                hp: 30,
                attack: 10,
                defense: 10,
                speed: 10,

            }
        })
    }


    return (
        <div className={style.div_Sup} >
            <div className={style.form_div} >
                <form className={style.form} onSubmit={(e)=>handleOnSubmit(e)}>
                    <fieldset className={style.description_fieldset }>
                        <legend >POKEMON DESCRIPTION</legend>
                        
                        <div className={style.input}><label>Name:</label><span className={style.error}>{error.name}</span><input value={creation.name} name="name" type='text' autoComplete="off" placeholder="lowercase text only..." maxLength='12' onChange={(e)=> handleOnChange(e)}/></div>
                        
                        <div className={style.input}><label>Image:</label><span className={style.error}>{error.image}</span><input value={creation.image} name="image" type="url" autoComplete="off" placeholder="image URL..." onChange={(e)=> handleOnChange(e)}/></div>
                        
                        <div className={style.input}><label>Weight:</label><span className={style.error}>{error.weight}</span><input value={creation.weight} type='number' name="weight" autoComplete='off' placeholder="less than 1000 kgs." min='1' onChange={(e)=> handleOnChange(e)}/></div>
                        
                        <div className={style.input}><label>Height:</label><span className={style.error}>{error.height}</span><input value={creation.height} type='number' name="height" autoComplete="off" placeholder="lower than 10 fts." min='1' onChange={(e)=> handleOnChange(e)}/></div>
                        {/* <select><option>Nan</option><option>Mario</option></select> */}
                    </fieldset>

                    <fieldset className={style.description_fieldset }>
                        <legend >POKEMON STATS</legend>
                        
                        <div className={style.input}><label>Health:</label><span className={style.span}>{creation.hp}</span><input name="hp" type="range" value={creation.hp} min="30" max="100" step="10" onChange={(e)=>handleOnChange(e)} /></div>
                        
                        <div className={style.input}><label>Attack:</label><span className={style.span}>{creation.attack}</span><input name="attack" type="range" value={creation.attack} min="10" max="100" step="10" onChange={(e)=>handleOnChange(e)} /></div>
                        
                        <div className={style.input}><label>Defense:</label><span className={style.span}>{creation.defense}</span><input name="defense" type="range" value={creation.defense} min="10" max="100" step="10" onChange={(e)=>handleOnChange(e)} /></div>
                        
                        <div className={style.input}><label>Speed:</label><span className={style.span}>{creation.speed}</span><input name="speed" type="range" value={creation.speed} min="10" max="100" step="10" onChange={(e)=>handleOnChange(e)} /></div>
                    </fieldset>

                    <fieldset className={style.description_fieldset }>      
                        <legend>POKEMON TYPES:</legend>
                        
                        <div className={style.grid}>
                        {pokemonsTypes?.length?
                        pokemonsTypes.map((type)=><div key={type.id} className={style.input} ><label ><input  onChange={(e)=>handleOnClick(e)} type="checkbox" name="Types" value={type.id} />{type.name}</label></div>)
                        :<></>} 
                        </div>      
                        <span className={style.error}>{error.Types}</span>
                    </fieldset>

                    <button disabled={error.disabled} type="submit" onClick={()=> setIsModalOpen(true)} >CREATE POKEMON</button>

                </form>
            </div>


            <div className={style.oak_img_div} >
                <img className={style.oak_img} src={pokemonMasterOak} alt="" />
            </div>


            <div className={style.card_preview_div } >
                <img className={style.pokedexTopHalf} src={pokedexTopHalf} alt="" />
                <div style={{"overflow": "hidden"}} className={style.preview_div} >
                    <div className={style.div_grid_el} ><h1>{creation.name.toUpperCase()}</h1></div>
                    <div style={{"color": "white", "gridArea": "weight", "backgroundColor": "blue", "width":"100%", "height":"100%", "margin":"0px", "padding":"0px"}}><h1>{creation.weight}</h1></div>
                    <div style={{"color": "white", "gridArea": "height", "backgroundColor": "yellow", "width":"100%", "height":"100%"}}><h1>{creation.height}</h1></div>
                    <div style={{"color": "white", "gridArea": "hp", "backgroundColor": "orange", "width":"100%", "height":"100%"}}><h1>{creation.hp}</h1></div>
                    <div style={{"color": "white", "gridArea": "attack", "backgroundColor": "green", "width":"100%", "height":"100%"}}><h1>{creation.attack}</h1></div>
                    <div style={{"color": "white", "gridArea": "defense", "backgroundColor": "pink", "width":"100%", "height":"100%"}}><h1>{creation.defense}</h1></div>
                    <div style={{"color": "white", "gridArea": "speed", "backgroundColor": "brown", "width":"100%", "height":"100%"}}><h1>{creation.speed}</h1></div>
                    <div style={{"width": "100%", "height": "100%", "gridArea":"img", "backgroundColor": "blue"}}><img src={creation.image} alt="" /></div>
                </div>
                <img className={style.pokedexBottomHalf} src={pokedexBottomHalf} alt="" />
            </div>


            {isModalOpen && 
                <Modal onClose={handleOnClose}>
                    {Array.isArray(pokemonsDisplay)? <h1>PROCESANDO...</h1>: pokemonsDisplay? <h1>POKEMON CREATED</h1>:<h1>SOMETHING FAILED</h1>}
                    <button onClick={()=>history.push('/home')}>GO HOME</button>
                    <button onClick={handleOnClose}>{pokemonsDisplay? "CREATE ANOTHER": "TRY AGAIN"}</button>

                </Modal>
            }
        </div>
    )
}

/*          id: data.id,
            name: data.name,
            types: data.types.map(t=>t.type.name), 
            image: data.sprites.other.dream_world.front_default,
            height: data.height,
            weight: data.weight,
            hp: data.stats.find(e=>e.stat.name === 'hp').base_stat,
            attack: data.stats.find(e=>e.stat.name === 'attack').base_stat,
            defense: data.stats.find(e=>e.stat.name === 'defense').base_stat,
            speed: data.stats.find(e=>e.stat.name === 'speed').base_stat, */