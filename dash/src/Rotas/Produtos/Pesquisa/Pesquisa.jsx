import React from 'react'
import style from './Pesquisa.module.css'
import FiltroEstoque from './FiltroEstoque/FiltroEstoque';
import FiltroCategoria from './FiltroCategoria/FiltroCategoria';

const Pesquisa = ({search, setSearch, filtros, setFiltros, produtos}) => {
    const produtosComEstoque = produtos.filter(item => item.estoque > 0)
    const somaProdutosLiquido = produtosComEstoque.reduce((total, item) =>  total + (item.estoque * item.preco),0)
    const somaProdutosBruto = produtosComEstoque.reduce((total, item) =>  total + (item.estoque * item.custo),0)

    const formatarPreco = e =>{
        const inteiro = `${e}`.split('.')[0].split('').reverse()
        const decimal = `${e.toFixed(2)}`.split('.')[1]
        let num = '';
        
        if(inteiro.length > 3) {            
            for (let i = 0; i < inteiro.length; i++) {
                
                if(i === 0)  num = `${num}${inteiro[i]}`
                else if(!(i%3)) num = `${num}.${inteiro[i]}`
                else num = `${num}${inteiro[i]}`
            }
        }else{            
            num = (inteiro.reverse().join(''));
        }   
        const valor = `${num.split('').reverse().join('')},${decimal}`
        return `R$ ${valor}`
    }


    return (
        <div className={style.main}>

            <div className={style.pesquisa}>
                <div className={style.input}>
                    <label htmlFor="pesquisa">Pesquisar</label>
                    <input type="search" value={search} onChange={e => setSearch(e.target.value)} />
                </div>

                
                {somaProdutosLiquido &&<div className={style.valor_estoque}>
                    <h5>Valor liquido do estoque</h5>
                    <span>{formatarPreco(somaProdutosLiquido)}</span>
                </div>}

                {somaProdutosBruto && <div className={style.valor_estoque}>
                    <h5>Valor bruto do estoque</h5>
                    <span>{formatarPreco(somaProdutosBruto)}</span>
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