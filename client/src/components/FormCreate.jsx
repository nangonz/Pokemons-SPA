import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearDisplay, getAllPokemons, getTypes } from "../redux/actions";
import PreviewCardCreation from "./PreviewCardCreation";
import Modal from "./Modal";
import style from "./FormCreate.module.css";
import validate from "../services/validators";
import oak from "../images/OAK01.png"
import load from "../images/loadingPikachu.gif"
import loadError from "../images/404-error-pokegif.gif"
import loadOk from "../images/popUpPikachu.gif"



export default function FormCreate(props){

    const history = useHistory()
    const pokemonsTypes = useSelector(state =>state.pokemonsTypes)
    const dispatch= useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isCreated, setIsCreated] = useState()
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
    },[dispatch])


    const handleOnSubmit = (e)=>{
        e.preventDefault();

        fetch('http://localhost:3001/pokemons', 
        {method:'POST', 
        headers:{'Content-Type': 'application/json'}, 
        body: JSON.stringify(creation)})
        .then(response => response.json())
        .then(data =>{
            setTimeout(()=> setIsCreated(data), 2000)
        })

        dispatch(getAllPokemons())
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
        setIsCreated()
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
                        
                        <div className={style.input}><label>Health:</label><div className="box"><input className="range" name="hp" type="range" value={creation.hp} min="30" max="100" onChange={(e)=>handleOnChange(e)} /><span id="rangeValue">{creation.hp}</span></div></div>
                        
                        <div className={style.input}><label>Attack:</label><div className="box"><input className="range" name="attack" type="range" value={creation.attack} min="10" max="100" onChange={(e)=>handleOnChange(e)} /><span id="rangeValue">{creation.attack}</span></div></div>
                        
                        <div className={style.input}><label>Defense:</label><div className="box"><input className="range" name="defense" type="range" value={creation.defense} min="10" max="100" onChange={(e)=>handleOnChange(e)} /><span id="rangeValue">{creation.defense}</span></div></div>
                        
                        <div className={style.input}><label>Speed:</label><div className="box"><input className="range" name="speed" type="range" value={creation.speed} min="10" max="100" onChange={(e)=>handleOnChange(e)} /><span id="rangeValue">{creation.speed}</span></div></div>
                    </fieldset>

                    <fieldset className={style.description_fieldset }>      
                        <legend>POKEMON TYPES:</legend>
                        
                        <div className={style.grid}>
                        {pokemonsTypes?.length?
                        pokemonsTypes.map((type)=><div key={type.id} className={style.input} ><input  id={type.id} onChange={(e)=>handleOnClick(e)} type="checkbox" name="Types" value={type.id} /><label htmlFor={type.id} className="label" >{type.name}</label></div>)
                        :<></>} 
                        </div>      
                        <span className={style.error}>{error.Types}</span>
                    </fieldset>
                            <br />
                    <button disabled={error.disabled} type="submit" onClick={()=> setIsModalOpen(true)} >CREATE POKEMON</button>

                </form>
            </div>


            <div className={style.oak_img_div} >
                <img className={style.oak_img} src={oak} alt="" />
            </div>

            <PreviewCardCreation creation={creation}/>

            {isModalOpen && 
                <Modal onClose={handleOnClose}>
                    <div className={style.flex}>
                        <div className={style.flex}>
                        { isCreated?.ok?

                            <div className={style.flex}>
                                <div style={{width: "150px"}}>
                                    <img className="gifok" src={loadOk} alt="ok"/>
                                </div>
                                <div className={style.flexcolum}>
                                    <div>
                                        <h1>POKEMON CREATED</h1>
                                        <span>Cool! Find your pokemon in home</span>
                                    </div>
                                    <div className={style.flex}>
                                            { isCreated? 
                                            <button onClick={()=>history.push("/home")}>GO HOME</button> 
                                            : null}
                                            { isCreated?
                                            <button onClick={handleOnClose}>{isCreated?.ok? "CREATE ANOTHER" : "TRY AGAIN"}</button> 
                                            : null}
                                    </div>
                                </div>
                            </div>

                        : isCreated?.error?

                            <div className={style.flex}>
                                <div style={{width: "150px"}}>
                                    <img className="gif" src={loadError} alt="failed"/>
                                </div>
                                <div className={style.flexcolum}>
                                    <div>
                                        <h1>SOMETHING FAILED</h1>
                                        <span>{isCreated.error}</span>
                                    </div>
                                    <div className={style.flex}>
                                        { isCreated? 
                                        <button onClick={()=>history.push("/home")}>GO HOME</button> 
                                        : null}
                                        { isCreated?
                                        <button onClick={handleOnClose}>{isCreated?.ok? "CREATE ANOTHER" : "TRY AGAIN"}</button> 
                                        : null}
                                    </div>
                                </div>
                            </div>

                        : 
                            <div className={style.flexcolum}>
                                <div style={{height: "70px"}}>
                                    <img className="gifload" src={load} alt="loading"/>
                                </div>
                                <div>
                                    <br />
                                    <h1>CREATING POKEMON</h1>
                                </div>
                            </div>
                        }
                        
                        </div>
                    </div>
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

            