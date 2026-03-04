import React from 'react'
import style from './InputDescricao.module.css'

const InputDescricao = ({descricao, setDescricao}) => {
  return (
    <div className={style.input}>
        <label htmlFor="descricao-do-cupom">Descrição do cupom:</label>
        <input name="descricao-do-cupom" id="descricao-do-cupom" value={descricao} onChange={e => setDescricao(e.target.value)} />
    </div>
  )
}

export default InputDescricao