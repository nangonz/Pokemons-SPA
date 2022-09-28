import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import style from './Nav.module.css'
import pikachuLogo from '../images/pikachuLogo.png'

export default function Nav(props){
    return(
        <div className={`${style.bg} ${style.align}`}>
            <Link to="/"><img className={style.logo} src={pikachuLogo} alt="logoNavHome"/></Link>
            <div className={style.align}>
                <NavLink to='/home'>Home</NavLink>
                <NavLink to='/create'>Create Pokemon</NavLink>
            </div>
        </div>
    )
}