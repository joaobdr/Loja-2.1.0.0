import React from 'react'
import style from './SectionSemLogin.module.css'
import LoginCheckout from './Frag/LoginCheckout/LoginCheckout'
import CadastrarCheckout from './Frag/CadastrarCheckout/CadastrarCheckout'


const SectionSemLogin = ({link, setUsuario, carrinho, setCarrinho}) => {


    return (
        <section className={style.section}>
            <div className={style.div_section}>
                <LoginCheckout link={link} setUsuario={setUsuario} carrinho={carrinho}/>
                <CadastrarCheckout link={link} carrinho={carrinho}/>
            </div>
        </section>
    )
}

export default SectionSemLogin