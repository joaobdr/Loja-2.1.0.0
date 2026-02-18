import React from 'react'
import style from './Input.module.css'

const Input = ({nome, valor, setValor, tipo, numero, preco, color}) => {

    const handle = e =>{
        if(numero) {
            const limpo = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '');
            return setValor(limpo)
        } 
        if(preco) {
            let limpo = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.')
            const match = limpo.match(/^(\d+)(\.\d{0,2})?/)
            return setValor(match ? match[0] : '')
        }
        return setValor(e.target.value)
    }

    

    return (
        <div className={style.input}>
            <label htmlFor={nome.toLowerCase().split(' ').join('-')}>{nome}</label>
            <input style={color ? {borderBottomColor: color} : {}} id={nome.toLowerCase().split(' ').join('-')} type={tipo} value={valor} onChange={handle} />
        </div>
    )
}

export default Input