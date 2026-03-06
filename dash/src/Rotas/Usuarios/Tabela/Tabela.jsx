import React from 'react'
import style from './Tabela.module.css'
import Linha from './Linha/Linha'

const Tabela = ({users, pesquisa}) => {




    return (
        <section className={style.section}>
            
            
            <table border='1' className={style.tabela}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Nome e sobrenome</th>
                        <th>Perfil</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((x, y) => <Linha key={y} user={x} pesquisa={pesquisa}/>)}
                </tbody>
            </table>
        </section>
    )
}

export default Tabela