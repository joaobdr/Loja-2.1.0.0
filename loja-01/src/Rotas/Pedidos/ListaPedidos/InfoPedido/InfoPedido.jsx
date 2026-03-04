import React from 'react'
import style from './InfoPedido.module.css'
import Lista from './Lista/Lista';

import Arrow2 from '../../../../../assets/imgs/site/arrow_2.svg?react';


const InfoPedido = ({link, info}) => {
  const pedido = info.status_pedido.sort((a, b) => new Date(b.data) - new Date(a.data))

  return (
    <div className={style.div_info}>
        <div className={style.produtos}>
            <h4 className={style.titulo}>Produtos</h4>

            <ul className={style.ul_produtos}>
                {info.itens.map((x, y) => <Lista key={y} link={link} produto={x}/>)}
            </ul>
        </div>


        <div className={style.detalhes_envio}>
            <ul className={style.ul_detalhes_envio}>
              {pedido.map((x, y)=>(
                <li>
                  {y != 0 && <span><Arrow2 /></span>}
                  <div>
                    <p>{x.status}</p>
                    <p>{(new Date(x.data)).toLocaleString("pt-BR").split(',').join(' - ')}</p>
                  </div>
                </li>
              ))}
            </ul>
        </div>
    </div>
  )
}

export default InfoPedido