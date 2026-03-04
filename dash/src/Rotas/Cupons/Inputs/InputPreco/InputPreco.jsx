import React from 'react'
import style from './InputPreco.module.css'

const InputPreco = ({nome, tipo, setValor, valor, numero}) => {


    const handleChange = e =>{    
        let limpo = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.')

        const match = limpo.match(/^(\d+)(\.\d{0,2})?/)
        return setValor(match ? match[0] : '')
    }

    const id = nome.split(' ').join('-')

    return (
        <div className={style.input}>
            <label htmlFor={id}>{nome}</label>
            <input id={id} type={tipo} value={valor} onChange={handleChange} />
        </div>
    )
}

export default InputPreco