import React from 'react'
import style from './Cadastrar.module.css'
import Input from '../../Global/Input/Input'
import FormCadastro from './FormCadastro/FormCadastro'

const Cadastrar = () => {
    const [codigo, setCodigo] = React.useState('')
    const [nome, setNome] = React.useState('')
    const [preco, setPreco] = React.useState('')
    const [custo, setCusto] = React.useState('')


    React.useEffect(()=>{
        document.title = 'Cadastrar produtos'
    },[])


    return (
        <div className={style.main}>
            <h2 className={style.titulo}>Cadastro de produtos</h2>

            <section className={style.section}>
                <FormCadastro />
            </section>
        </div>
    )
}


export default Cadastrar