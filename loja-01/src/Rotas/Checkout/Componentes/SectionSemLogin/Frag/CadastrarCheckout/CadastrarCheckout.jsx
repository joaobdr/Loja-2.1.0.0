import React from 'react'
import style from './CadastrarCheckout.module.css'
import FormCadastro from './Frag/FormCadastro'

const CadastrarCheckout = ({link, carrinho}) => {
    const [formCadastro, setFormCadastro] = React.useState(false)

    return (
        <div className={style.cadastrar}>
            <div className={style.div_cadastro}>
                {!formCadastro ? (
                    <>
                        <h2 className={style.titulo}>Cadastrar</h2>
                        <p className={style.p}>Criar uma conta é fácil! Informe seus dados e uma senha para aproveitar todos os beneficios de ter uma conta.</p>
                        <button className={style.btn_abrir_form} onClick={e => setFormCadastro(true)}>Cadastrar</button>
                    </>
                ) : <FormCadastro link={link} carrinho={carrinho}/>}
            </div>
        </div>
    )
}

export default CadastrarCheckout