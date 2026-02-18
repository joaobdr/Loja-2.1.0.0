import React from 'react'
import style from './ItensDestaques.module.css'
import { useStorage } from '../../../Global/Storage';


const ItensDestaques = ({item}) => {
    const {link, formatado} = React.useContext(useStorage)
    

    return (
        <li className={style.li}>
            <figure>
                <img src={link + item.imagens[0]} alt="" />
            </figure>
            <h3 className={style.titulo}>{item.nome}</h3>
            <p>{item.descricao}</p>
            <span>{formatado(item.preco)}</span>
        </li>
    )
}

export default ItensDestaques