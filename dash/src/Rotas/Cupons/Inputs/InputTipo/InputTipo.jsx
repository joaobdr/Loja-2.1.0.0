import React from 'react'
import style from './InputTipo.module.css'

const InputTipo = ({desconto, setDesconto, tipo, setTipo}) => {

    const handleChange = e => setDesconto(!isNaN(e.target.value) ? Number(e.target.value) : '')


    return (
        <div className={style.select}>
            <div className={style.select2}>
                <label htmlFor="input-tipo-de-desconto">Tipo de desconto:</label>
                <select 
                    name="input-tipo-de-desconto" 
                    id="input-tipo-de-desconto"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                >
                    <option value="porcentagem">%</option>
                    <option value="R$">R$</option>
                </select>
            </div>
            <div className={style.input_select}>
                <label htmlFor="">Valor do desconto:</label>
                <input type="text" value={desconto} onChange={handleChange}/>
            </div>
        </div>
    )
}

export default InputTipo