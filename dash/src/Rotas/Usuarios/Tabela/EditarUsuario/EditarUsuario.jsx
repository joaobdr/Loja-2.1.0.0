import React from 'react'
import style from './EditarUsuario.module.css'
import Close from '/assets/imgs/close.svg?react'
import Select from '../../Select/Select'
import Input from '../../../../Global/Input/Input'
import { useStorage } from '../../../../Global/Storage'

import Arrow from '/assets/imgs/arrow.svg?react'

const hierarquia = [
    {
        cargo: 'desabilitado',
        valor: 1
    },
    {
        cargo: 'padrao',
        valor: 2
    },
    {
        cargo: 'administrador',
        valor: 3
    },
    {
        cargo: 'fundador',
        valor: 10
    },
    {
        cargo: 'root',
        valor: 100
    }
]

const EditarUsuario = ({user, setJanela, puxarUsers}) => {
    const {login, token, link} = React.useContext(useStorage)        
    
    const verificarHierarquia =  hierarquia.find(x => x.cargo === login.perfil)  

    const [perfil, setPerfil] = React.useState(user.perfil)
    const [nome, setNome] = React.useState(user.nome)
    const [senha, setSenha] = React.useState('')
    const [repetirSenha, setRepetirSenha] = React.useState('')

    const [mensagem, setMensagem] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [alterarSenha, setAlterarSenha] = React.useState(false)

    const handleSubmit = async e =>{
        e.preventDefault()
        setLoading(true)

        const options = {
            method: 'POST',
            headers: {'Content-type': 'application/json', token, usernameadm: login.username},
            body: JSON.stringify({perfil, senha, repetirSenha, nome, username: user.username})
        }        

        console.log('opt ===', options);
        
        
        try {
            const POST = await fetch(link + '/api/usuario/atualizar', options)
            const resp = await POST.json()

            if(resp.status) {
                puxarUsers()
                setJanela(false)
            }
            console.log('resp ===', resp);
            
            setMensagem(resp.msg)

        } catch (error) {console.log(error); setMensagem('Erro ao enviar formulario!')} finally{setLoading(false)}
    }

    return (
        <div className={style.box}>
            <div className={style.content}>
                <button className={style.btn_close} onClick={() => setJanela(false)}><Close /></button>
                
                <h2 className={style.titulo}>Editar usuário</h2>

                <form className={style.form_user} onSubmit={handleSubmit}>
                    <h4 className={style.titulo}>{user.username}</h4>
                    
                    <div className={style.inputs}>
                        <Input valor={nome} setValor={setNome} nome='Nome completo' tipo='text'/>


                        <div className={style.senha}>
                            <h3 className={style.titulo} onClick={() => setAlterarSenha(prev => !prev)}>Alterar senha <Arrow style={alterarSenha ? {rotate: '180deg'} : {rotate: '0deg'}}/></h3>
                            <div className={`${style.div_senha} ${alterarSenha ? style.active : ''}`} >
                                <Input valor={senha} setValor={setSenha} nome='senha' tipo='password'/>
                                <Input valor={repetirSenha} setValor={setRepetirSenha} nome='Repetir senha' tipo='password'/>
                            </div>
                        </div>


                        <div className={style.select}>
                            <label htmlFor="select-perfil">Perfil</label>
                
                            <select name="select-perfil" id="select-perfil" value={perfil} onChange={e => setPerfil(e.target.value)}>
                                {(verificarHierarquia.valor >= hierarquia.find(x => x.cargo === 'desabilitado').valor) ? <option value="desabilitado">desabilitado</option> : null}
                                {(verificarHierarquia.valor >= hierarquia.find(x => x.cargo === 'padrao').valor) ? <option value="padrao">padrao</option> : null}
                                {(verificarHierarquia.valor >= hierarquia.find(x => x.cargo === 'administrador').valor) ? <option value="administrador">Administrador</option> : null}
                                {(verificarHierarquia.valor >= hierarquia.find(x => x.cargo === 'fundador').valor) ? <option value="fundador">Fundador</option> : null}
                                {(verificarHierarquia.valor >= hierarquia.find(x => x.cargo === 'root').valor) ? <option value="root">Root</option> : null}
                            </select>
                        </div>

                    </div>

                    {mensagem && <span className={style.mensagem_erro}>{mensagem}</span>}

                    <button disabled={loading} className={style.button_salvar}>Salvar</button>
                </form>
            </div>
        </div>
    )
}

export default EditarUsuario