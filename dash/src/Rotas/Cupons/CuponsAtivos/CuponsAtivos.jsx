import React from 'react'
import style from './CuponsAtivos.module.css'
import EditarCupom from './EditarCupom/EditarCupom'

import Edit from '/assets/imgs/edit.svg?react'


const CuponsAtivos = ({cupom, filtros, setCupons}) => {
    const [janela, setJanela] = React.useState(false)
    const formatado = valor =>{
        return valor.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });
    }
    const data = e =>{
       if(!e) return 'ILIMITADO'        
        const dt = new Date(e)
        const dataFormatada = dt.toLocaleDateString("pt-BR");
        return dataFormatada
    }


    if(!cupom.cupom.toUpperCase().includes(filtros.pesquisa.toUpperCase())) return null
    if(filtros.ativos !== 'todos'){
        if(filtros.ativos === 'ativos' && !cupom.ativo) return null
        if(filtros.ativos === 'inativos' && cupom.ativo) return null
    }
    
    return (
        <>
            {janela && <EditarCupom infoCupom={cupom} setCupons={setCupons} setJanela={setJanela}/>}
            <li className={style.li}>
                <p>{cupom.cupom}</p>
                <p>{cupom.desconto.tipo === 'porcentagem' ?   cupom.desconto.valor+'%' : formatado(cupom.desconto.valor)}</p>
                <p>{Array.isArray(cupom.usados) ? cupom.usados.length : cupom.usados}</p>
                <p>{cupom.limiteGeral ? cupom.limiteGeral : '+9999'}</p>
                <p>{data(cupom.dataFim)}</p>
                <p style={{color: `${cupom.ativo ? 'green' : 'red'}`}}>{cupom.ativo ? 'Ativo': "Inativo"}</p>
                <p><button onClick={() => setJanela(true)}><Edit /></button></p>
            </li>
        </>
    )
}

export default CuponsAtivos