import React from 'react'
import style from './FiltroEstoque.module.css'

const FiltroEstoque = ({setFiltros, filtros}) => {


  return (
    <div className={style.estoque}>
        <h5 className={style.titulo}>
            Estoque
        </h5>


        <div className={style.div_estoque_input}>
            <input id='tudo' type="radio" name='estoque' checked={filtros.estoque === 'tudo' ? true : false} onChange={e => setFiltros(prev => ({...prev, estoque: 'tudo'}))}/>
            <label htmlFor="tudo">tudo</label>
        </div>
        <div className={style.div_estoque_input}>
            <input id='sem-estoque' type="radio" name='estoque' checked={filtros.estoque === 'sem' ? true : false} onChange={e => setFiltros(prev => ({...prev, estoque: 'sem'}))} />
            <label htmlFor="sem-estoque">com estoque</label>
        </div>
        <div className={style.div_estoque_input}>
            <input id='com-estoque' type="radio" name='estoque' checked={filtros.estoque === 'com' ? true : false} onChange={e => setFiltros(prev => ({...prev, estoque: 'com'}))}/>
            <label htmlFor="com-estoque">sem estoque</label>
        </div>
    </div>
  )
}

export default FiltroEstoque