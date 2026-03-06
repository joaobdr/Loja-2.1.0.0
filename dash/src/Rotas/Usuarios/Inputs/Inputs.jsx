import React from 'react'
import style from './Inputs.module.css'


const Inputs = ({pesquisa, setPesquisa, users}) => {

    const cargos = users.map(x => x.cargo)
    

    return (
        <div className={style.div_pai}>
            <div className={style.input_pesquisa}>
                <label htmlFor="search">Pesquisar:</label>
                <input type="search" id='search' value={pesquisa.search} onChange={e => setPesquisa(prev => ({...prev, search: e.target.value}))}/>
            </div>

            <div className={style.filtro_categoria}>
                <label htmlFor="cargos-select">Cargos:</label>

                <select 
                    value={pesquisa.cargo} 
                    onChange={e => setPesquisa(prev => ({...prev, cargo: e.target.value}))}  
                    name="cargos-select"
                    id="cargos-select"
                >

                    <option value="tudo">tudo</option>
                    {cargos.map((x, y) => <option key={y} value={x}>{x}</option>)}
                </select>
            </div>
        </div>
    )
}

export default Inputs