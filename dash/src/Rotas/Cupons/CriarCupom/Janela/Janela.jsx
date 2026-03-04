import React from 'react'
import style from './Janela.module.css'
import InputCupom from '../../Inputs/InputCupom/InputCupom'
import InputTipo from '../../Inputs/InputTipo/InputTipo';
import InputData from '../../Inputs/InputData/InputData';
import InputDescricao from '../../Inputs/InputDescricao/InputDescricao';
import InputNum from '../../Inputs/InputNum/InputNum';


import Sair from '/assets/imgs/close.svg?react'
import InputPreco from '../../Inputs/InputPreco/InputPreco';
import InputRadio from '../../Inputs/InputRadio/InputRadio';
import { useStorage } from '../../../../Global/Storage';

const Janela = ({setDisabled, setCupons}) => {
    const {login, token, link} = React.useContext(useStorage)
    const [cupom, setCupom] = React.useState('')
    const [descricao, setDescricao] = React.useState('')
    const [validade, setValidade] = React.useState()
    const [desconto, setDesconto] = React.useState('')
    const [tipo, setTipo] = React.useState('porcentagem')
    const [quantidade, setQuantidade] = React.useState('')
    const [ativo, setAtivo] = React.useState(true)
    const [varMin, setVarMin] = React.useState('')
    const [primeiraCompra, setPrimeiraCompra] = React.useState(false)

    const [loading, setLoading] = React.useState(false)
    const [mensagem, setMensagem] = React.useState(null)


    
    React.useEffect(() =>{
        const handleKey = e =>{ if(e.key === 'Escape') setDisabled(false) }
        window.addEventListener('keydown', handleKey)
    },[])

    
    const handleSubmit = async e =>{
        e.preventDefault()
        setLoading(true)

        const options = {
            method: 'POST', 
            headers: {'Content-type': 'application/json', token, username: login.username},
            body: JSON.stringify({cupom, descricao, validade, desconto, tipo, limit: quantidade, valor_minimo: varMin, primeira_compra: primeiraCompra})
        }
        

        try {
            const post = await fetch(link + '/api/cupom/criar', options)
            const resp = await post.json()

            setMensagem(resp.msg)

            if(resp.status){
                setCupons(resp.lista)
                
                setDisabled(false)
            }

            
            
        } catch (error) {
            
        }finally{
            console.log('enviar formulario');
            setLoading(false)
        }
    }


    return (
        <div className={style.janela}>
            <section className={style.section}>
                <button className={style.button_sair} onClick={() => setDisabled(false)}><Sair /></button>
                
                <form className={style.form} onSubmit={handleSubmit}>
                    {/* <h3 className={style.titulo}>Criar um novo cupom</h3> */}

                    <h5 className={style.titulo}>Geral</h5>
                    <div className={style.inputs}>
                        <InputCupom setValor={setCupom} valor={cupom} nome="Nome do cupom:" tipo="text" required={true}/>
                        <InputDescricao descricao={descricao} setDescricao={setDescricao}/>
                        <InputTipo desconto={desconto} setDesconto={setDesconto} setTipo={setTipo} tipo={tipo}/>
                        <InputData validade={validade} setValidade={setValidade}/>
                    </div>

                    <h5 className={style.titulo}>Restrições</h5>
                    <div className={style.restricoes}>
                        <div className={style.primeiro_restri}>
                            <InputNum valor={quantidade} setValor={setQuantidade} nome='Limite geral de cupons:' tipo="text" numero={true}/>
                            <InputPreco valor={varMin} setValor={setVarMin} nome='Valor mínimo da compra:' tipo="text"/>
                        </div>

                        <InputRadio primeiraCompra={ativo} setPrimeiraCompra={setAtivo} texto="Ativo"/>
                        <InputRadio primeiraCompra={primeiraCompra} setPrimeiraCompra={setPrimeiraCompra} texto="Cupom valido só na primeira compra"/>
                    </div>

                    {mensagem && <span className={style.span_erro}>{mensagem}</span>}
                    <button disabled={loading} className={style.button_submit}>Criar</button>
                </form>
                
            </section>
        </div>
    )
}

export default Janela