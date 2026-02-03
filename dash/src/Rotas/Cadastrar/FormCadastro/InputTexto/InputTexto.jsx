import React from 'react'
import style from './InputTexto.module.css'


const InputTexto = ({valor, setValor, nome, tipo, preco, numero}) => {

    const handle = {
        numeros: e =>  {
            const limpo = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '');
            return setValor(limpo)
        },
        texto: e =>setValor(e.target.value),
        preco: e => {
            let limpo = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.')

            const match = limpo.match(/^(\d+)(\.\d{0,2})?/)
            return setValor(match ? match[0] : '')
        }
    }

    const verificacao = e =>{
        if(preco) return handle.preco(e)
        if(numero) return handle.numeros(e)
        return handle.texto(e)
    }

    return (
        <div className={`${style.inputCodigo} ${preco ? style.preco : ''}`}>
            <label htmlFor={nome.toLowerCase().split(' ').join('-')}>{nome}:</label>
            <input 
                id={nome.toLowerCase().split(' ').join('-')} 
                type={tipo} 
                value={valor} 
                onChange={verificacao} 
                />
        </div>
    )
}

export default InputTexto