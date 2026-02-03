import React from 'react'
import style from './Login.module.css'
import Input from '../../Global/Input/Input'
import { useStorage } from '../../Global/Storage'

const Login = ({}) => {
    const [username, setUsername] = React.useState('')
    const [senha, setSenha] = React.useState('')
    const [error, setError] = React.useState('')
    const [btnActive, setBtnActive] = React.useState(false)
    const {link, setToken, setLogin} = React.useContext(useStorage)

    React.useEffect(()=> {document.title = 'Login'} , [])

    const handleSubmit = async e =>{
        e.preventDefault()
        setBtnActive(true)

        if(!senha || !username) {
            setBtnActive(false)
            return setError('Usuário ou senha faltando!')
        }

        const options = {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({username, senha})
        }

        try {
            const post = await fetch(link + '/api/login', options)
            const resp = await post.json()
            setError(resp.msg);

            if(resp.status){
                setToken(resp.token)
                setLogin(resp.info_user)
                window.localStorage.setItem('token', resp.token)
                window.localStorage.setItem('usuario', JSON.stringify({...resp.info_user}))
            }
            
            
        } catch (err) {
            console.log(error);
            setError('Erro ao enviar formulario!')
        }    

        finally{
            setBtnActive(false)
        }
    }

  return (
    <main className={style.main}>
        <section className={style.section}>
            <form className={style.form} onSubmit={handleSubmit}>
                <h1 className={style.titulo}>Login</h1>

                <div className={style.div_input}>
                    <Input tipo='text' nome="Username" valor={username} setValor={setUsername} required={true}/>
                    <Input tipo='password' nome="Senha" valor={senha} setValor={setSenha} required={true}/>

                    {error && <span className={style.error}>{error}</span>}
                </div>

                <button disabled={btnActive} style={btnActive ? {cursor: 'not-allowed', opacity: '.2'} : {}} className={style.btn}>{btnActive ? 'Entrando...' :'Entrar' }</button>
            </form>
        </section>
    </main>
  )
}

export default Login