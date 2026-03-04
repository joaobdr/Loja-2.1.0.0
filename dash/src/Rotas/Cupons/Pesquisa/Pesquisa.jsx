import React from 'react'
import style from './Pesquisa.module.css'

const Pesquisa = ({setFiltros, filtros}) => {


    return (
        <section className={style.section}>
            <div className={style.input}>
                <label htmlFor="pesquisa">Pesquisar cupom: </label>
                <input
                    type="search" 
                    id='pesquisa' 
                    value={filtros.Pesquisa}
                    onChange={e => setFiltros(prev => ({...prev, pesquisa: e.target.value}))}
                    />
            </div>


            <div className={style.ativos}>
                <label className={style.active}>
                    <input 
                        type="radio" 
                        name='ativos' 
                        onChange={() => setFiltros(prev => ({...prev, ativos: 'todos'}))} 
                        checked={filtros.ativos === 'todos' ? true : false}
                    />
                    Todos
                </label>

                <label className={style.active}>
                    <input 
                        type="radio" 
                        name='ativos' 
                        onChange={() => setFiltros(prev => ({...prev, ativos: 'ativos'}))} 
                        checked={filtros.ativos === 'ativos' ? true : false}
                        />
                    Ativos
                </label>

                <label className={style.active}>
                    <input 
                        type="radio" 
                        name='ativos' 
                        onChange={() => setFiltros(prev => ({...prev, ativos: 'inativos'}))} 
                        checked={filtros.ativos === 'inativos' ? true : false}
                        />
                    Inativos
                </label>
            </div>
        </section>
    )
}

export default Pesquisa