import React from 'react'


import Edit from '/assets/imgs/edit.svg?react'

const Linha = ({user, pesquisa}) => { 
    
    if(!(user.username.toLowerCase().includes(pesquisa.search.toLowerCase())) || !(pesquisa.cargo === 'tudo' ? true : pesquisa.cargo === user.cargo)) return null

    return (
            <tr>
                <td>{user.username}</td>
                <td>{user.nome} {user.sobrenome}</td>
                <td>{user.perfil}</td>
                <td><Edit /></td>
            </tr>
    )
}

export default Linha