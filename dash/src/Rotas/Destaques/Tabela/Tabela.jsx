import React from 'react'
import style from './Tabela.module.css'
import Linha from './Linha/Linha'

const Tabela = ({produtos, setProdutos}) => {

    // console.log(produtos);
    

    return (
        <table border="1" className={style.tabela}>
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Destaque</th>
                </tr>
            </thead>



            <tbody>
               {produtos.map((x, y) => <Linha key={y} item={x} setProdutos={setProdutos} />)}
            </tbody>
        </table>
    )
}

export default Tabela