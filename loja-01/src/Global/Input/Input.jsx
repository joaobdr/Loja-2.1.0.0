import React from 'react'
import style from './Input.module.css'

const Input = ({nome, valor, setValor, tipo}) => {


    return (
        <div className={style.input}>
            <label htmlFor={`${nome.toLowerCase().split(' ').join('-')}`}>{nome}</label>
            <input id={`${nome.toLowerCase().split(' ').join('-')}`} type={tipo} value={valor} onChange={e => setValor(e.target.value)} />
        </div>
    )
}

export default Input