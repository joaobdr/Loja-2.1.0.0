import React from 'react'
import style from './Usuarios.module.css'
import { useStorage } from '../../Global/Storage'

import People from '/assets/imgs/people.svg?react'
import Tabela from './Tabela/Tabela'
import CadastrarUser from './CadastrarUser/CadastrarUser'
import Inputs from './Inputs/Inputs'


import Btn from '/assets/imgs/plus.svg?react'

const Usuarios = () => {

    const cargosPermitidoCadastrar = new Set(['adm', 'admin', 'root'])
    const {login, token, link, setPagina} = React.useContext(useStorage)
    const [users, setUsers] = React.useState([])
    const [pesquisa, setPesquisa] = React.useState({search: '', cargo: 'tudo'})
    const [janelaCadastro, setJanelaCadastro] = React.useState(false)


    const puxarUsers = async e =>{
        const options ={method: 'GET', headers: {token, username: login.username}}

        try{
            const get = await fetch(link + '/api/usuarios/lista', options)
            const resp = await get.json()
            
            if(resp.status) setUsers(resp.usuarios)}
        catch(err){
            console.log(err);
            
        }
        
    }

    React.useEffect(()=>{
        setPagina('usuarios')
        document.title = 'Gerenciamento de cusuários'

        puxarUsers()
    },[])

    return (
        <div className={style.main}>
            {janelaCadastro && <CadastrarUser puxarUsers={puxarUsers} setJanelaCadastro={setJanelaCadastro}/>}
            <div className={style.opcoes}>
                <div className={style.pesquisar}>
                    <Inputs pesquisa={pesquisa} setPesquisa={setPesquisa} users={users}/>
                </div>
                {cargosPermitidoCadastrar.has(login.perfil) && (
                    <button className={style.btn_cadastrar} onClick={() => setJanelaCadastro(true)}>
                        Cadastrar
                        <Btn />
                    </button>)}
            </div>

            <Tabela users={users} pesquisa={pesquisa} puxarUsers={puxarUsers}/>
        </div>
    )
}

export default Usuarios