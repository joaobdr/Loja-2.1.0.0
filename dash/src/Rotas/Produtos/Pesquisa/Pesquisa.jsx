import React from 'react'
import style from './Pesquisa.module.css'
import FiltroEstoque from './FiltroEstoque/FiltroEstoque';
import FiltroCategoria from './FiltroCategoria/FiltroCategoria';

const Pesquisa = ({search, setSearch, filtros, setFiltros, produtos}) => {
    const produtosComEstoque = produtos.filter(item => item.estoque > 0)
    const somaProdutosCusto = produtosComEstoque.reduce((total, item) =>  total + (item.estoque * item.custo),0)
    const somaProdutosBruto = produtosComEstoque.reduce((total, item) =>  total + (item.estoque * item.preco),0)


    const formatado = valor =>{
        return valor.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });
    }

    return (
        <div className={style.main}>

            <div className={style.pesquisa}>
                <div className={style.input}>
                    <label htmlFor="pesquisa">Pesquisar</label>
                    <input type="search" value={search} onChange={e => setSearch(e.target.value)} />
                </div>

                
                {!isNaN(somaProdutosCusto) &&<div className={style.valor_estoque}>
                    <h5>Custo do estoque</h5>
                    <span>{formatado(somaProdutosCusto)}</span>
                </div>}

                {!isNaN(somaProdutosBruto) && <div className={style.valor_estoque}>
                    <h5>Bruto do estoque</h5>
                    <span>{formatado(somaProdutosBruto)}</span>
                </div>}
            </div>
            
            
            <div className={style.filtros}>
                <h4 className={style.titulo}>Filtros</h4>

                <section className={style.section}>
                    <FiltroEstoque filtros={filtros} setFiltros={setFiltros}/>
                    <FiltroCategoria produtos={produtos} setFiltros={setFiltros} filtros={filtros}/>
                </section>
            </div>
        </div>
    )
}

export default Pesquisa