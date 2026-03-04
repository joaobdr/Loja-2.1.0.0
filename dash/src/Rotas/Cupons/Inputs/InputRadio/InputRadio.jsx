import React from 'react'
import style from './InputRadio.module.css'


const InputRadio = ({primeiraCompra, setPrimeiraCompra, texto}) => {    

    const limpo = texto.split(' ').join('-').toLowerCase()

    return (
        <div className={style.div}>
            <div className={style.input}>
                <input 
                    id={limpo}
                    name={limpo}
                    type="checkbox"
                    checked={primeiraCompra}
                    onChange={(e) => setPrimeiraCompra(e.target.checked)}
                    aria-label={texto}
                    />
                <label htmlFor={limpo}>{texto}</label>
            </div>

            {/* <div className={style.input}>
                <input id='primeira-compra' name='primeira-compra' type="checkbox" checked={primeiraCompra} onChange={() => setPrimeiraCompra(prev => !prev)}/>
                <label htmlFor="primeira-compra">Cupom valido só na primeira compra</label>
            </div> */}
        </div>
    )
}

export default InputRadio