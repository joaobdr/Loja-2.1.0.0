import React from 'react'
import style from './Login.module.css'
import { Link } from 'react-router-dom';
import Input from '../../Global/Input/Input';
import FormLogin from './Frag/FormLogin/FormLogin';
import FormCadastro from './Frag/FormCadastro/FormCadastro';

const Login = ({link, setUsuario, carrinho, setCarrinho}) => {
    const [cadastro, setCadastro] = React.useState(false)

    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.documentElement.scrollTop = 0;
        document.title = 'Login'
        return () => {
            document.body.style.overflow = 'auto'
        
        };
    }, []);



    return (
        <main className={style.main}>
            
            <section className={style.login}>
                <div className={style.img_login}> 
                    <img src={link + '/assets/imgs/home-07.jpg'} alt="" />
                </div>

                {cadastro ? <FormCadastro link={link} setCadastro={setCadastro} setUsuario={setUsuario}/> : <FormLogin link={link} setCadastro={setCadastro} setUsuario={setUsuario} setCarrinho={setCarrinho} carrinho={carrinho}/>}
            </section>
        </main>
    )
}

export default Login