import React from 'react'
import style from './CadastrarUser.module.css'


import Close from '/assets/imgs/close.svg?react'
import Input from '../../../Global/Input/Input'
import { useStorage } from '../../../Global/Storage'
import Select from './Select/Select'

const CadastrarUser = ({puxarUsers, setJanelaCadastro}) => {
    const {token, login, link} = React.useContext(useStorage)
    const [username, setUsername] = React.useState('')
    const [senha, setSenha] = React.useState('')
    const [repetirSenha, setRepetirSenha] = React.useState('')
    const [nome, setNome] = React.useState('')
    const [perfil, setPerfil] = React.useState('desabilitado')
    const [loading, setLoading] = React.useState(false)
    const [mensagem, setMensagem] = React.useState('')

    const handleSubmit = async e =>{
        e.preventDefault()
        setLoading(true)

        console.log(repetirSenha !== senha);
        console.log(repetirSenha);
        console.log(senha);
        console.log('---------------------------------------------------------');
        
        

        if(repetirSenha !== senha){
            setMensagem("As senhas não são iguais")
            return setLoading(false)
        }

        const options = {
            method: 'POST',
            headers: {'Content-type': "application/json", token, username: login.username},
            body: JSON.stringify({username, senha, repetirSenha, nome, perfil})
        }

        try {
            const post = await fetch(link +'/api/usuarios/cadastrar', options)
            const resp = await post.json()

            if(resp.status) {
                puxarUsers()
                return setJanelaCadastro(false)
            }else{
                setMensagem(resp.msg)
            }

            
        } catch (error) {console.log(error)}
        finally{
            setLoading(false)
        }

    }
    
// valor, setValor, nome, tipo, required
    return (
        <section className={style.section}>
            <div className={style.content}>
                <button className={style.close} onClick={() => setJanelaCadastro(false) }><Close /></button>

                <form onSubmit={handleSubmit} className={style.form}>
                    <h3 className={style.titulo}>Cadastro de usuário</h3>
                    <div className={style.inputs}>
                        <Input valor={nome} setValor={setNome} nome="Nome e sobrenome" tipo="text" required={true}/>
                        <Input valor={username} setValor={setUsername} nome="Username" tipo="text" required={true}/>
                        <Input valor={senha} setValor={setSenha} nome="Senha" tipo="password" required={true}/>
                        <Input valor={repetirSenha} setValor={setRepetirSenha} nome="Repetir a senha" tipo="password" required={true}/>
                        <Select setPerfil={setPerfil} perfil={perfil}/>
                    </div>

                    {mensagem && <span className={style.msg_erro}>{mensagem}</span>}
                    <button disabled={loading} className={style.btn_form}>Cadastrar</button>
                </form>
            </div>
        </section>
    )
}

export default CadastrarUser