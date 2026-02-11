import React from 'react'
import style from './EditarProduto.module.css'
import { useStorage } from '../../../Global/Storage';

import Close from '/assets/imgs/close.svg?react'
import Input from './Input/Input';
import InputImagens from './InputImagens/InputImagens';

const EditarProduto = ({setJanela, produto}) => {
    const [form, setForm] = React.useState(false)
    const {link} = React.useContext(useStorage)
    const [nome, setNome] = React.useState('')
    const [custo, setCusto] = React.useState('')
    const [preco, setPreco] = React.useState('')
    const [estoque, setEstoque] = React.useState('')
    const [categoria, setCategoria] = React.useState('')
    const [descricao, setDescricao] = React.useState('')
    const [imagens, setImagens] = React.useState([])
    const [imagemFundo, setImagemFundo] = React.useState(null)
    const [remover, setRemover] = React.useState(null)


    const handleSubmit = async e =>{
        e.preventDefault()
        setForm(true)
        console.log('teste');
        

    }
    console.log(produto);
    

    return (
        <div className={style.section}>
            <form className={style.content} onSubmit={handleSubmit}>
                <button className={style.button_close} onClick={() => setJanela(false)}><Close /></button>

                <div className={style.codigo}>
                    <div className={style.info}>
                        <h5>Codigo: </h5>
                        <span>{produto.codigo}</span>
                    </div>
                </div>

                <div className={style.div_input}>
                    <div className={style.inputs}>
                        <Input nome="Nome" tipo='text' valor={nome} setValor={setNome}/>
                        <Input nome="Preço" tipo='text' valor={preco} setValor={setPreco} preco={true}/>
                        <Input nome="Custo" tipo='text' valor={custo} setValor={setCusto} preco={true}/>
                    </div>

                    <div className={style.inputs}>
                        <Input nome="Estoque" tipo='text' valor={estoque} setValor={setEstoque} numero={true}/>
                        <Input nome="Categoria" tipo='text' valor={categoria} setValor={setCategoria}/>
                    </div>

                    <div className={style.descricao}>
                        <label htmlFor="descticao-do-produto">Descrição do produto:</label>
                        <textarea value={descricao} onChange={e => setDescricao(e.target.value)} name="descticao-do-produto" id="descticao-do-produto"></textarea>
                    </div>

                    <InputImagens  produto={produto} imagens={imagens} setImagens={setImagens}/>


                    <div className={style.imagem_fundo}>
                        {imagemFundo ? null : <img src={link + produto.imagem_fundo}/>}
                    </div>
                </div>


                <div className={style.botoes}>
                    <button type='button' onClick={() => setJanela(false)}>Cancelar</button>
                    <button disabled={form}>Salvar</button>
                </div>
            </form>
        </div>
    )
}

export default EditarProduto