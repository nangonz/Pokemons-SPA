import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTypes, filterAndOrder, setPokemons } from "../redux/actions"
import orderService from "../services/sort.js"
import filterService from "../services/filter.js"
import style from "./Filter.module.css"



export default function Filter(){
    const allPokemons = useSelector(state=> state.pokemons)
    const pokemonsTypes = useSelector(state => state.pokemonsTypes)
    const [filter, setFilter] = useState({})
    const [order, setOrder] = useState({})
    const dispatch = useDispatch()


    useEffect(()=>{
        if(!pokemonsTypes){
            dispatch(getTypes())
        }
        if(allPokemons){
            dispatch(setPokemons())
        }
        return ()=>dispatch(setPokemons())

    }, [dispatch])


    const handleOnChangeOrder = (e) =>{
        setOrder((prevState)=>{
            return {
                ...prevState,
                [e.target.name] : e.target.value
            }
        })
    }

    const handleOnChangeFilter = (e) =>{
        setFilter((prevState)=>{
            return {
                ...prevState,
                [e.target.name] : e.target.value
            }
        })
    }


    useEffect(()=>{
        if(Array.isArray(allPokemons)){
            let pokemons = [...JSON.parse(JSON.stringify(allPokemons))]
            pokemons = filterService(pokemons, filter)

            if(pokemons && pokemons.length === 0){
                return dispatch(filterAndOrder({error: "not found"}))
            }
            return dispatch(filterAndOrder(orderService(pokemons, order)))
        }

    }, [dispatch, filter, order])







    return(
        <div className={style.flex} >
            <fieldset>
                <legend className={style.legend}>FILTER BY ORIGIN</legend>
                <select onChange={(e)=> handleOnChangeFilter(e)} name="origin" >
                    <option value="all">all</option>
                    <option value="originals">originals</option>
                    <option value="created">created</option>
                </select>

            </fieldset>
            <fieldset>
                <legend className={style.legend}>FILTER BY TYPE</legend>
                <div className={style.grid}>
                    {pokemonsTypes?.length? pokemonsTypes.map(type=> <div key={type.id} className={style.input} ><input type="radio" value={type.name} name="Types" onChange={(e)=> handleOnChangeFilter(e)} />{type.name}</div>): <></>}
                </div>

            </fieldset>
            <fieldset>
                <legend className={style.legend}>ORDER BY</legend>
                <div className={style.input}>
                    <input  type="radio" name="orderBy" value="name" onChange={(e)=> handleOnChangeOrder(e)}/>name
                </div>
                <div className={style.input}>
                    <input  type="radio" name="orderBy" value="attack" onChange={(e)=> handleOnChangeOrder(e)}/>attack
                </div>
                <div className={style.input}>
                    <input  type="radio" name="orderBy" value="defense" onChange={(e)=> handleOnChangeOrder(e)}/>defense
                </div>
                <div className={style.input}>
                    <input  type="radio" name="orderBy" value="hp" onChange={(e)=> handleOnChangeOrder(e)}/>health points
                </div>
                <div className={style.input}>
                    <input  type="radio" name="orderBy" value="speed" onChange={(e)=> handleOnChangeOrder(e)}/>speed
                </div>
                <div className={style.input}>
                    <input  type="radio" name="orderBy" value="weight" onChange={(e)=> handleOnChangeOrder(e)}/>weight
                </div>
                <div className={style.input}>
                    <input  type="radio" name="orderBy" value="height" onChange={(e)=> handleOnChangeOrder(e)}/>height
                </div>


            </fieldset>
            <fieldset>
                <legend className={style.legend}>ORDER AS</legend>
                <div className={style.input}>
                    <input  type="radio" name="orderAs" value="ASC" onChange={(e)=> handleOnChangeOrder(e)}/>ascend
                </div>
                <div className={style.input}>
                    <input  type="radio" name="orderAs" value="DES" onChange={(e)=> handleOnChangeOrder(e)}/>descend
                </div>
            </fieldset>
        </div>
    )
}