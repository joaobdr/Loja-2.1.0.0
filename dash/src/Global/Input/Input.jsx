import React from 'react'
import style from './Input.module.css'

const Input = ({valor, setValor, nome, tipo, required, }) => {
    const nomeLimpo = nome.toLowerCase().split(' ').join('-')


  return (
    <div className={style.input}>
        <label htmlFor={nomeLimpo}>{nome}</label>
        <input type={tipo} id={nomeLimpo} value={valor} onChange={e => setValor(e.target.value)} required={required} autoComplete={tipo === 'password' ? "current-password": 'username'}/>
    </div>
  )
}

export default Input