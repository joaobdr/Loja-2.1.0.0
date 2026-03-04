import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import style from './FormLogin.module.css'
import Input from '../../../../Global/Input/Input'

const FormLogin = ({link, setCadastro, setUsuario, setCarrinho, carrinho}) => {
    const [email, setEmail] = React.useState('')
    const [senha, setSenha] = React.useState('')
    const [mensagem, setMensagem] = React.useState('')
    const navigate = useNavigate()


    const handleSubmit = async e =>{
        e.preventDefault()
        
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({email, senha, carrinho})
        }
        
        const POST = await fetch(link + '/api/loja/login', options)
        const RESP = await POST.json()

        setMensagem(RESP.msg)
        if(RESP.status) {
            setUsuario(RESP.user)
            console.log(RESP.user.carrinho);
            
            setCarrinho(RESP.user.carrinho ? [...RESP.user.carrinho] : carrinho)
            localStorage.setItem('token', RESP.token)
            localStorage.removeItem('carrinho');
            navigate('/')
        }
    }

    return (
        <form onSubmit={handleSubmit} className={style.form_login}>
            <div className={style.div_form}>
                <h1 className={style.titulo}>Login</h1>
                
                <Input nome="Email" valor={email} setValor={setEmail} tipo='text'/>
                <Input nome="Senha" valor={senha} setValor={setSenha} tipo="password"/>

                <div className={style.link_cadastro}>
                    <Link to="#">Esqueci a senha</Link>
                    <Link to="#" onClick={e => setCadastro(true)}>Me cadastrar</Link>
                </div>                       

                <button className={style.btn_submit}>Entrar</button>

                {mensagem && <p className={style.mensagem_erro}>{mensagem}</p>}
            </div>
        </form>
    )
}

export default FormLogin