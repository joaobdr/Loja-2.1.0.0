import React from 'react'
import style from './LoginCheckout.module.css'
import Input from '../../../../../../Global/Input/Input'

const LoginCheckout = ({link, carrinho, usuario, setUsuario}) => {
    const [email, serEmail] = React.useState('')
    const [senha, setSenha] = React.useState('')
    const [mensagem, setMensagem] = React.useState(null)

    const handleSubmit = async e =>{
        e.preventDefault()
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, senha, carrinho})
        }

        const POST = await fetch(link + '/api/loja/login', options)
        const RESP = await POST.json()
        console.log(RESP);            

        if(RESP.status){
            localStorage.setItem('token', RESP.token)
            setUsuario(RESP.user)
        }else setMensagem(RESP.msg)
    }

    return ( 
            <form className={style.form_login} onSubmit={handleSubmit}>
                <div className={style.div_form}>
                    <h2 className={style.titulo}>Login</h2>
                    <Input nome='Email' valor={email} setValor={serEmail} tipo='email'/>
                    <Input nome='Senha' valor={senha} setValor={setSenha} tipo='password'/>
                    {mensagem && <span className={style.mensagem_erro}>{mensagem}</span>}
                    <button className={style.btn_entrar}>Entrar</button>
                </div>
            </form>
        )
}

export default LoginCheckout