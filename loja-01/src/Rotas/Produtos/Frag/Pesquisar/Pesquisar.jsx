import React from 'react'
import style from './Pesquisar.module.css'

const Pesquisar = () => {
  return (
    <div className={style.pesquisar}>
        <div className={style.input_pesquisar}>
            <label htmlFor="pesquisar-produto">Pesquisar</label>
            <input type="search" />
        </div>

        <div>
            
        </div>
    </div>
  )
}

export default Pesquisar