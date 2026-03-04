import React from 'react'
import style from './Lista_produtos.module.css'
import { Link } from 'react-router-dom';


const Produto = ({link, info}) => {
    const formatado = (+info.preco).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    

    return (
        <li className={style.li_produto}>
            <Link to={`/produto/${info.codigo}`} className={style.a_produto}>
                <div>
                    <img src={link + info.fotos[0]} alt="" />
                    <p className={style.nome_produto}>{info.produto}</p>                
                    <p className={style.descricao}>{info.descricao}</p>
                </div>
                
                <p className={style.span_preco}><span>{formatado.split(',')[0]}</span><small>{formatado.split(',')[1]}</small></p>
            </Link>
        </li>
    )
}

export default Produto