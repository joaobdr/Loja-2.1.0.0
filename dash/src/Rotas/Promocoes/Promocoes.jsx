import React from 'react'
import style from './Promocoes.module.css'
import { useStorage } from '../../Global/Storage'


const Promocoes = ({}) => {
    const {setPagina} = React.useContext(useStorage)

    

    React.useEffect(()=>{
        setPagina('promocoes')
        document.title = 'Gerenciar produtos em promoção'
        // puxarProdutos()
    },[])

    return (
        <div className={style.main}>
            Promoções
        </div>
    )
}

export default Promocoes