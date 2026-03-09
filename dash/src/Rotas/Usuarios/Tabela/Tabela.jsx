import React from 'react'
import style from './Tabela.module.css'
import Linha from './Linha/Linha'
import EditarUsuario from './EditarUsuario/EditarUsuario'

const Tabela = ({users, pesquisa, puxarUsers}) => {
    const [janela, setJanela] = React.useState(false)



    return (
        <section className={style.section}>
            {janela && <EditarUsuario user={janela} setJanela={setJanela} puxarUsers={puxarUsers}/>}
            
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
                    {users.map((x, y) => <Linha key={y} setJanela={setJanela} user={x} pesquisa={pesquisa}/>)}
                </tbody>
            </table>
        </section>
    )
}

export default Tabela