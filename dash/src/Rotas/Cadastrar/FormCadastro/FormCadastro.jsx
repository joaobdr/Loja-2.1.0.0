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

    const [mensagem, setMensagem] = React.useState(null)
    const {link, login, token} = React.useContext(useStorage)

    const handleSubmit = async e =>{
        e.preventDefault()       

        if(!imagens[0]) return setMensagem('Insira pelo menos uma imagem!!')
            
        const formData = new FormData()

        console.log(login.username);
        
        formData.append('codigo', codigo)
        formData.append('username', login.username)
        formData.append('nome', nome)
        formData.append('preco', preco)
        formData.append('custo', custo)
        formData.append('categoria', categoria)
        formData.append('descricao', descricao)
        formData.append('estoque', estoque)
        formData.append('fundo', fundo)
        imagens.forEach(x => formData.append('imagens', x))

        const options = {
            method: 'POST',
            headers: {token: `Bearer ${token}`},
            body: formData
        }
        
        try {
            const post = await fetch(link + "/api/produto/cadastrar", options)
            const resp = await post.json()

            console.log(resp);
            setMensagem(resp.msg);

            
        } catch (error) {
            setMensagem('Erro ao salvar informações, por favor tente mais tarde!')
        }        
    }

    

    return (
        <form className={style.form} onSubmit={handleSubmit}>

            <div className={style.div_inputs}>
                <h3 className={style.titulo}>Campos obrigatorios</h3>

                <section>
                    <InputTexto valor={codigo} setValor={setCodigo} nome='codigo' tipo="text" numero={true} required={true} />
                    <InputTexto valor={nome} setValor={setNome} nome='Nome produto' tipo="text" numero={false} preco={false} required={true}/>
                    <InputTexto valor={categoria} setValor={setCategoria} nome='Categoria' tipo="text" required={true}/>
                </section>
            </div>

            <div className={style.div_inputs}>
                <h3 className={style.titulo}>Campos opcionais</h3>

                <section>
                    <InputTexto valor={preco} setValor={setPreco} nome='Preço' tipo="text" preco={true}/>
                    <InputTexto valor={custo} setValor={setCusto} nome='Custo' tipo="text" preco={true}/>
                    <InputTexto valor={estoque} setValor={setEstoque} nome='Estoque' tipo="text" preco={true}/>
                </section>
            </div>
            <div className={style.descricao}>
                <label>
                    <h5>Descrição do produto</h5>
                    <textarea placeholder='Insira aqui uma descrição para o produto' onChange={e => setDescricao(e.target.value)} value={descricao} required></textarea>
                </label>
            </div>

            <InputFotos imagens={imagens} setImagens={setImagens}/>
            <InputFundo fundo={fundo} setFundo={setFundo} link={link}/>

            {mensagem && <span className={style.span_erro}>{mensagem}</span>}

            <button className={style.btn}>Cadastrar produto</button>
        </form>
    )
}

export default FormCadastro