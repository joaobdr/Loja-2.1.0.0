import React from 'react'
import { Link } from 'react-router-dom';
import style from './FormCadastro.module.css'
import Input from '../../../../Global/Input/Input';

const FormCadastro = ({link, setCadastro, setUsuario}) => {
    const [email, setEmail] = React.useState('')
    const [senha, setSenha] = React.useState('')
    const [repetirSenha, setRepetirSenha] = React.useState('')
    const [nome, setNome] = React.useState('')
    const [sobrenome, setSobrenome] = React.useState('')
    const [mensagem, setMensagem] = React.useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()        
        
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({email, senha, repetirSenha, nome, sobrenome})
        }
        
        const POST = await fetch(link + '/api/loja/cadastrar', options)
        const RESP = await POST.json()

        console.log(RESP);
        setMensagem(RESP.msg)

        if(RESP.status) {
            setUsuario(RESP.user)
            localStorage.setItem('token', RESP.token)
        }
    }


    return (
        <form onSubmit={handleSubmit} className={style.form_login}>  
            <div className={style.div_form}>
                <h1 className={style.titulo}>Me cadastrar</h1>
                
                <Input nome="Nome" valor={nome} setValor={setNome} tipo='text'/>
                <Input nome="Sobrenome" valor={sobrenome} setValor={setSobrenome} tipo="text"/>
                <Input nome="Email" valor={email} setValor={setEmail} tipo="email"/>
                <Input nome="Senha" valor={senha} setValor={setSenha} tipo="password"/>
                <Input nome="Repetir senha" valor={repetirSenha} setValor={setRepetirSenha} tipo="password"/>

                <div className={style.link_cadastro}>
                    {/* <Link to="#">Esqueci a senha</Link> */}
                    <Link to="#" onClick={e => setCadastro(false)}>Voltar para login</Link>
                </div>                       

                <button className={style.btn_submit}>Cadastrar</button>

                {mensagem && <p className={style.mensagem_erro}>{mensagem}</p>}
            </div>
        </form>
    )
}

export default FormCadastro