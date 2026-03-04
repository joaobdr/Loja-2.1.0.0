import React from 'react'
import style from './Resumo.module.css'

const Resumo = ({produtos}) => {
    const precos = produtos && produtos.map(x => x.preco * x.qtd)
    const total = produtos && precos.reduce((total, numero) =>  {return total + numero}, 0);
    
    const formatado = e => {
        return (e).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });}
    
  return (
    <div className={style.resumo}>
        <ul className={style.ul_resumo}>
            {produtos && produtos.map((x, y)=> <li key={y}><p>{x.produto}</p><p>{x.qtd}X</p><span>{formatado(Number(x.preco * x.qtd))}</span></li>)}
        </ul>

        <div className={style.valores}>
            <p>total:</p>
            <span>{formatado(Number(total))}</span>
        </div>
    </div>
  )
}

export default Resumo