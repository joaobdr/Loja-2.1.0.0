import React from 'react'
import style from './EditarProduto.module.css'
import { useStorage } from '../../../Global/Storage';
import InputImagens from './InputImagens/InputImagens';
import Input from './Input/Input';

import Close from '/assets/imgs/close.svg?react'
import Replace from '/assets/imgs/replace.svg?react'

const EditarProduto = ({setJanela, produto, setProdutos}) => {
    const [loading, setLoading] = React.useState(false)
    const {link, token, login} = React.useContext(useStorage)

    const [nome, setNome] = React.useState(produto.nome)
    const [custo, setCusto] = React.useState(produto.custo)
    const [preco, setPreco] = React.useState(produto.preco)
    const [estoque, setEstoque] = React.useState(produto.estoque)
    const [categoria, setCategoria] = React.useState(produto.categoria)
    const [descricao, setDescricao] = React.useState(produto.descricao)
    const [imagens, setImagens] = React.useState([])
    const [imagemFundo, setImagemFundo] = React.useState(null)
    const [imagemBack, setImagemBack] = React.useState(produto.imagens)

    const [remover, setRemover] = React.useState(null)


    const handleSubmit = async e =>{
        e.preventDefault()
        setLoading(true)
        
        
        const formData = new FormData()
        formData.append('username', login.username)
        formData.append('codigo', produto.codigo)

        //Comparo se não foi removido nenhuma imagem q estava no banco de dados
        const iguais = produto.imagens.length === imagemBack.length && produto.imagens.slice().sort().every((v, i) => v === imagemBack.slice().sort()[i]);;
        
        formData.append('imgsAlteradas', JSON.stringify(imagemBack))
        formData.append('custo', custo)
        formData.append('preco', preco)
        formData.append('estoque', estoque)
        if(nome !== produto.nome) formData.append('nome', nome)
        if(categoria !== produto.categoria) formData.append('categoria', categoria)
        if(descricao !== produto.descricao) formData.append('descricao', descricao)
        if(imagemFundo) formData.append('imagemFundo', imagemFundo)
        if(imagens.length > 0) imagens.forEach(x => formData.append('imagens', x))

        try {
            const options = {method: 'POST', headers: {token: `Bearer ${token}`}, body: formData}

            const post = await fetch(link + '/api/produto/atualizar', options)
            const resp = await post.json()

            if(resp.status){
                setProdutos(resp.lista)
                setJanela(false)
            }
            
        } catch (error) {
            
        }
        finally{
            setLoading(false)
        }
        

    }
    
    

    return (
        <div className={style.section}>
            <form className={style.content} onSubmit={handleSubmit}>
                <button type='button' className={style.button_close} onClick={() => setJanela(false)}><Close /></button>

                <div className={style.codigo}>
                    <div className={style.info}>
                        <h5>Codigo: </h5>
                        <span>{produto.codigo}</span>
                    </div>
                </div>

                <div className={style.content_div}>



                    <div className={style.div_input}>
                        <div className={style.inputs}>
                            <Input nome="Nome" tipo='text' valor={nome} setValor={setNome} color={nome !== produto.nome ? 'green' : false}/>
                            <Input nome="Preço" tipo='text' valor={preco} setValor={setPreco} preco={true} color={preco !== produto.preco ? 'green' : false}/>
                            <Input nome="Custo" tipo='text' valor={custo} setValor={setCusto} preco={true} color={custo !== produto.custo ? 'green' : false}/>
                        </div>

                        <div className={style.inputs}>
                            <Input nome="Estoque" tipo='text' valor={estoque} setValor={setEstoque} numero={true} color={estoque !== produto.estoque ? 'green' : false}/>
                            <Input nome="Categoria" tipo='text' valor={categoria} setValor={setCategoria} color={categoria !== produto.categoria ? 'green' : false}/>
                        </div>

                        <div className={style.descricao}>
                            <label htmlFor="descticao-do-produto">Descrição do produto:</label>
                            <textarea value={descricao} onChange={e => setDescricao(e.target.value)} name="descticao-do-produto" id="descticao-do-produto"></textarea>
                        </div>

                        <InputImagens  setImagemBack={setImagemBack} produto={imagemBack} imagens={imagens} setImagens={setImagens}/>


                        <div className={style.imagem_fundo}>
                            <label className={style.replace_button}>
                                <input type="file" accept='image/*' onChange={e => setImagemFundo(e.target.files[0])}/>
                                <Replace />
                            </label>
                            <img src={imagemFundo ? URL.createObjectURL(imagemFundo) :  link + produto.imagem_fundo}/>
                        </div>
                    </div>


                    <div className={style.botoes}>
                        <button type='button' onClick={() => setJanela(false)}>Cancelar</button>
                        <button disabled={loading}>Salvar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditarProduto