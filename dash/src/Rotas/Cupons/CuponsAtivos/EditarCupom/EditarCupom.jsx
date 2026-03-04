import React from 'react'
import style from './EditarCupom.module.css'
import InputCupom from '../../Inputs/InputCupom/InputCupom'
import InputDescricao from '../../Inputs/InputDescricao/InputDescricao'
import InputTipo from '../../Inputs/InputTipo/InputTipo'
import InputData from '../../Inputs/InputData/InputData'
import InputNum from '../../Inputs/InputNum/InputNum'
import InputPreco from '../../Inputs/InputPreco/InputPreco'
import InputRadio from '../../Inputs/InputRadio/InputRadio'

import Close from '/assets/imgs/close.svg?react'
import { useStorage } from '../../../../Global/Storage'

const EditarCupom = ({infoCupom, setJanela, setCupons}) => {
    const {login, token, link} = React.useContext(useStorage)

    const [descricao, setDescricao] = React.useState(infoCupom.descricao)
    const [tipo, setTipo] = React.useState(infoCupom.desconto.tipo)
    const [desconto, setDesconto] = React.useState(infoCupom.desconto.valor)
    const [validade, setValidade] = React.useState(infoCupom.dataFim)
    const [limitGeralCupons, setLimitGeralCupons] = React.useState(infoCupom.limiteGeral)
    const [varMin, setVarMin] = React.useState(infoCupom.restricoes.valorMinimoDesconto)
    const [varMax, setVarMax] = React.useState(infoCupom.restricoes.valorMaximoDesconto)
    const [primeiraCompra, setPrimeiraCompra] = React.useState(infoCupom.restricoes.apenasPrimeiraCompra)
    const [ativo, setAtivo] = React.useState(infoCupom.ativo)
    const [mensagem, setMensagem] = React.useState(null)
    const [loading, setLoading] = React.useState(false)


    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        
        const options = {
            method: "POST",
            headers: {'Content-type': 'application/json', token, username: login.username},
            body: JSON.stringify({
                cupom: infoCupom.cupom,
                descricao,
                validade,
                ativo,
                tipo,
                desconto,
                limit: limitGeralCupons,
                valor_minimo: varMin,
                valor_maximo: varMax,
                primeira_compra: primeiraCompra,
            })
        }

        try {
            const post = await fetch(link + '/api/cupom/atualizar', options)
            const resp = await post.json()

            setMensagem(resp.msg)

            if(resp.status){
                console.log(resp.lista);
                
                setCupons(resp.lista)
                setJanela(false)
            }

            
        } catch (error) {  
            console.log(error);          
        }
        finally{
            setLoading(false)
        }

    }
    

    return (
        <div className={style.div}>
            <div className={style.content}>
                <button className={style.button_close} onClick={() => setJanela(false)}><Close /></button>

                <form className={style.content_info} onSubmit={handleSubmit}>
                    <h3 className={style.titulo}>Editar cupom</h3>
                    
                    <h5 className={style.titulo}>Geral</h5>
                    <div className={style.input}>
                        <span className={style.cupom}>{infoCupom.cupom}</span>
                        <InputDescricao descricao={descricao} setDescricao={setDescricao}/>
                        <InputTipo desconto={desconto} setDesconto={setDesconto} tipo={tipo} setTipo={setTipo}/>
                        <InputData validade={validade} setValidade={setValidade}/>
                    </div>


                    <h5 className={style.titulo}>Restrições</h5>
                    <div className={style.restricoes}>
                        <InputNum valor={limitGeralCupons} setValor={setLimitGeralCupons} nome='Limite geral de cupons:' tipo="text" numero={true}/>
                        <div className={style.primeiro_restri}>
                            <InputPreco valor={varMin} setValor={setVarMin} nome='Valor mínimo da compra:' tipo="text"/>
                            <InputPreco valor={varMax} setValor={setVarMax} nome='Valor máximo do desconto:' tipo="text"/>
                        </div>

                        <InputRadio primeiraCompra={ativo} setPrimeiraCompra={setAtivo} texto="Ativo"/>
                        <InputRadio primeiraCompra={primeiraCompra} setPrimeiraCompra={setPrimeiraCompra} texto="Cupom valido só na primeira compra"/>
                    </div>

                    {mensagem && <span className={style.span_erro}>{mensagem}</span>}
                    <button disabled={loading} className={style.button_submit}>Salvar</button>
                </form>
            </div>
        </div>
    )
}

export default EditarCupom