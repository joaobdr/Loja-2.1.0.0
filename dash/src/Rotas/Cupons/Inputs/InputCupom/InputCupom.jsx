import React from 'react'
import style from './InputCupom.module.css'

const InputCupom = ({valor, setValor, nome, tipo, required, }) => {
    const nomeLimpo = nome.toLowerCase().split(' ').join('-')

    const handleChange = e => setValor(e.target.value.toUpperCase().split(' ').join(''))

    return (
        <div className={style.input}>
            <label htmlFor={nomeLimpo}>{nome}</label>
            <input type={tipo} id={nomeLimpo} value={valor} onChange={handleChange} required={required}/>
        </div>
    )
}

export default InputCupom