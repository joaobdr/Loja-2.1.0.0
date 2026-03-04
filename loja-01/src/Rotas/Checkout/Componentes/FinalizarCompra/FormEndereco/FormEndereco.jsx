import React from 'react'
import style from './FormEndereco.module.css'
import  Close from '../../../../../../assets/imgs/site/Close.svg?react';


const FormEndereco = ({link, setInfoEntrega, infoEntrega, setJanela, janela, setFormulario}) => {
    const [nome, setNome] = React.useState('')
    const [sobrenome, setSobrenome] = React.useState('')
    const [cep, setCep] = React.useState('')
    const [endereco, setEndereco] = React.useState('')
    const [num, setNum] = React.useState('')
    const [bairro, setBairro] = React.useState('')
    const [complemento, setComplemento] = React.useState('')
    const [referencia, setReferencia] = React.useState('')
    const [estado, setEstado] = React.useState('')
    const [cidade, setCidade] = React.useState('')
    const [telefone, setTelefone] = React.useState('')


    function handleSubmit(e){
        e.preventDefault()
        
        setInfoEntrega({
            nome,
            sobrenome, 
            cep, 
            endereco, 
            numero: num, 
            bairro, 
            complemento, 
            referencia, 
            estado, 
            cidade, 
            telefone
        })  
        


        setJanela(true)
        setFormulario(true)

    }

    async function puxarCep(e) {
        const GET = await fetch(`https://viacep.com.br/ws/${e}/json/`)
        const RESP = await GET.json()
        
        if(RESP.erro) return        
        setEndereco(RESP.logradouro)
        setBairro(RESP.bairro)
        setEstado(RESP.uf)
        // setInfoEntrega({...infoEntrega, cep: e})
        setCidade(RESP.localidade)
    }

    function handleChange(e) {
        const value = e.target.value
            .replace(/\D/g, '')
            .slice(0, 8)            

        if(value.split('').length === 8) {
            setCep(value)
            puxarCep(value)
        } else setCep(value)
    }
    const formatarTelefone = (valor) => {
        valor = valor.replace(/\D/g, '') // remove tudo que não for número

        if (valor.length <= 10) {
            return valor
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
        }

        return valor
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
    }
    
    return (
        <div className={style.div_pai}>

            {/* <label className={style.radio}>
                <input type="radio" name="info-entrega-ou-retirada" value="entrega" checked={tipo === 'entrega'} onChange={e => setTipo(e.target.value)}/>
                <span className={style.checkmark}></span>
                Entrega
            </label> */}
            <h3 className={style.titulo}>Informações da entrega</h3>

            {janela ? (
                <div className={style.conteudo_info}>
                    <p>{`${infoEntrega.nome} ${infoEntrega.sobrenome}`}</p>
                    <p>{`${infoEntrega.endereco} N° ${infoEntrega.numero} ${infoEntrega.complemento}`}</p>
                    <p>{`${infoEntrega.bairro} - CEP ${infoEntrega.cep}`}</p>
                    <p>{`${infoEntrega.cidade}/${infoEntrega.estado}`}</p>
                    <p>{`${infoEntrega.telefone}`}</p>
                </div>
            ) :(
            <div className={style.box_content}>
                <form className={style.form_endereco}  onSubmit={handleSubmit}>
                    {/* <Close className={style.btn_close} onClick={e => setJanela(false)}/> */}                    
                    <div className={style.div_input}>
                        <input className={style.input} required type="text" placeholder='Nome *' value={nome} onChange={e => setNome(e.target.value)}/>
                        <input className={style.input} required type="text" placeholder='Sobrenome *' value={sobrenome} onChange={e => setSobrenome(e.target.value)}/>
                        <input className={style.input} required type="text" placeholder='CEP *' value={cep} onChange={handleChange}/>
                    </div>

                    <div className={style.div_input}>
                        <input className={style.input} required type="text" placeholder='Endereço' value={endereco} disabled/>
                        <input className={style.input} required type="text" placeholder='Número*' value={num} onChange={e => setNum(e.target.value)}/>
                    </div>
                    <div className={style.div_input}>
                        <input className={style.input} required type="text" placeholder='Bairro' disabled value={bairro}/>
                        <input className={style.input} type="text" placeholder='Complemento'value={complemento} onChange={e => setComplemento(e.target.value)}/>
                    </div>
                    <div className={style.div_input}>
                        <input className={style.input} required type="text" placeholder='Estado' value={estado} disabled/>
                        <input className={style.input} required type="text" placeholder='Cidade' value={cidade} disabled/>
                    </div>

                    <input className={style.input} required type="text" placeholder='Ponto de referência*' value={referencia} onChange={e => setReferencia(e.target.value)}/>


                    <input className={style.input} required type="tel" maxLength={15} placeholder='Telefone*' value={telefone} onChange={e => setTelefone(formatarTelefone(e.target.value))} />

                    <button className={style.btn}>Salvar</button>
                </form>
            </div>)}
        </div>
    )
}

export default FormEndereco