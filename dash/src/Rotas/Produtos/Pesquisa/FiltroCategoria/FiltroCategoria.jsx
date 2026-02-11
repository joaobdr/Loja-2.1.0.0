import React from 'react'
import style from './FiltroCategoria.module.css'



const FiltroCategoria = ({ filtros, setFiltros, produtos }) => {
    const categorias = [...new Set(produtos.map(x => x.categoria))]
    

    return (
        <div className={style.content}>
            <label htmlFor="filtro-categoria">Filtrar por categoria</label>
            <select name="categorias-filtro" id="filtro-categoria" value={filtros.categoria} onChange={e => setFiltros(prev => ({...prev, categoria: e.target.value}))}>
                <option value="all">Todas as categorias</option>
                {categorias.map((x, y) => <option key={y} value={x}>{x}</option>)}
            </select>
        </div>
    )
}

export default FiltroCategoria
