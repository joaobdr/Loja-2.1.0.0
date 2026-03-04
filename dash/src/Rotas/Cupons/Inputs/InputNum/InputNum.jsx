import React from 'react'
import style from './InputNum.module.css'

const InputNum = ({nome, tipo, setValor, valor, numero}) => {

    const handleChange = e =>{    
        const somenteNumeros = e.target.value.replace(/\D/g, '')
        
        setValor(somenteNumeros)
    }

    const id = nome.split(' ').join('-')

    return (
        <div className={style.input}>
            <label htmlFor={id}>{nome}</label>
            <input id={id} type={tipo} value={valor} onChange={handleChange} />
        </div>
    )
}

export default InputNum