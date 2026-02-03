import React from 'react'
import style from './FormCadastro.module.css'
import { useStorage } from '../../../Global/Storage'
import InputFotos from './InputFotos/InputFotos'
import InputTexto from './InputTexto/InputTexto'

//*********************     SVGs    *******************
import Plus from '/assets/imgs/plus.svg?react'
import InputFundo from './InputFundo/InputFundo'

const FormCadastro = () => {
    const [codigo, setCodigo] = React.useState('')
    const [nome, setNome] = React.useState('')
    const [preco, setPreco] = React.useState('')
    const [custo, setCusto] = React.useState('')
    const [imagens, setImagens] = React.useState([])
    const [fundo, setFundo] = React.useState('/assets/imgs/default_fundo.jpg')
    const [descricao, setDescricao] = React.useState('')
    const [categoria, setCategoria] = React.useState('')
    const [estoque, setEstoque] = React.useState('')
    const [active, setActive] = React.useState(false) // se o produto vai ficar ativo ou não
    const [fotoM, setFotoM] = React.useState(false) //indoca a animação de adicionar outro fundo na imagem de fundo


    const {link} = React.useContext(useStorage)

    const ts = {
        codigo: 1234,
        nome: 'teste 123',
        preco: 9.9,
        custo: 7.79,
        imagens: ['imagem-01.jpg', 'imagem-02.jpg'],
        descricao: 'Descrição do produto',
        categoria: 'categoria 01',
        ativo: false,
        estoque: 99,
        destaque: false,
        data_criacao: '15/03/2026'
    }
    const handleSubmit = async e =>{
        e.preventDefault()
        console.log('enviar formualrio');
        
    }


    return (
        <form className={style.form} onSubmit={handleSubmit}>

            <div className={style.div_inputs}>
                <InputTexto valor={codigo} setValor={setCodigo} nome='codigo' tipo="text" numero={true} />
                <InputTexto valor={nome} setValor={setNome} nome='Nome do produto' tipo="text" numero={false} preco={false}/>
                <InputTexto valor={preco} setValor={setPreco} nome='Preço' tipo="text" preco={true}/>
                <InputTexto valor={custo} setValor={setCusto} nome='Custo' tipo="text" preco={true}/>
            </div>

            <InputFotos imagens={imagens} setImagens={setImagens}/>
            <InputFundo fundo={fundo} setFundo={setFundo} link={link}/>

            <button className={style.btn}>Cadastrar produto</button>
        </form>
    )
}

export default FormCadastro