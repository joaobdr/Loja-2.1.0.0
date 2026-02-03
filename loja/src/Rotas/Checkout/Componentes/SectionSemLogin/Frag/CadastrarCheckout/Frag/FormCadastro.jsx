import React from 'react'
import style from './FormCadastro.module.css'
import Input from '../../../../../../../Global/Input/Input'

const FormCadastro = ({link, setUsuario}) => {
    const [nome, setNome] = React.useState('')
    const [sobrenome, setSobrenome] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [senha, setSenha] = React.useState('')
    const [repetirSenha, setRepetirSenha] = React.useState('')


    const handleSubmit = e =>{
        e.preventDefault()
    }
    


  return (
    <form className={style.form} onSubmit={handleSubmit}>
        <h2 className={style.titulo}>Cadastrar</h2>

        <Input tipo='text' nome='Nome' setValor={setNome} valor={nome} />
        <Input tipo='text' nome='Sobrenome' setValor={setSobrenome} valor={sobrenome} />
        <Input tipo='email' nome='Email' setValor={setEmail} valor={email} />
        <Input tipo='password' nome='senha' setValor={setSenha} valor={senha} />
        <Input tipo='password' nome='Reperir senha' setValor={setRepetirSenha} valor={repetirSenha} />

        <button className={style.btn_cadastrar}>Cadastrar</button>
    </form>
  )
}

export default FormCadastro