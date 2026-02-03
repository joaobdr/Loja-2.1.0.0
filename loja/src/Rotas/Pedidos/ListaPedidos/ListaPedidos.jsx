import React from 'react'
import style from './ListaPedido.module.css'
import { useNavigate } from 'react-router-dom';
import  DoubleArrow from '../../../../assets/imgs/site/doubleArrow.svg?react';
import InfoPedido from './InfoPedido/InfoPedido';

const ListaPedidos = ({link, info}) => {
    const [janela, setJanela] = React.useState(false)
    const dataISO = info.data;
    const data = new Date(dataISO);
    const dataFormatada = data.toLocaleString("pt-BR");

    const formatado = e => {
        return (e).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });}
    
    React.useEffect(()=>{
        // console.log(info);
        
    },[])
     
    return (
        <li className={style.lista} 
            style={{
                maxHeight: janela ? '1000px' : '124px',
                // opacity: janela ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 1s ease' }}>

            <div className={style.div_header}>
                    <p>Pedido: <span>#{info.pedido_id}</span></p>
                    <p>Status: <span>{info.status_pedido[info.status_pedido.length - 1].status}</span></p>
                    <p>Data: <span>{dataFormatada.split(',').join(' -')}</span></p> 
            </div>

            <div>
                {janela && <InfoPedido link={link} info={info}/>}
            </div>
            
            <div className={style.btn_mais} onClick={e => setJanela(!janela)}>
                <DoubleArrow style={janela ? {rotate: '270deg', transition: 'all .5s ease'} : {rotate: '90deg', transition: 'all .5s ease'}}/> 
            </div>
        </li>
  )
}

export default ListaPedidos