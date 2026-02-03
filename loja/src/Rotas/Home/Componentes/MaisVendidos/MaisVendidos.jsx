import React from 'react'
import style from './MaisVendidos.module.css'
import Lista_Produtos from '../../../../Global/Lista_produtos/Lista_Produtos'
import Loading from '../../../../Global/Loading/Loading'



const MaisVendidos = ({link}) => {
  const [lista_produtos, setLista_produtos] = React.useState([])


  const GET_PRODUTOS = async () =>{
    const GET_FETCH = await fetch(link + '/api/loja/produtos/mais-vendidos')
    const RESP = await GET_FETCH.json()

    if(RESP.status) setLista_produtos(RESP.list.slice(0, 5))    
  }

  React.useEffect(()=>{
    GET_PRODUTOS()
  },[])

  
  return (
    <section className={`container ${style.section}`}>
        <h4 className={style.titulo}>Mais vendidos</h4>
        
        
        <div className={style.lista_produtos}>
          {/* <Loading /> */}
          <ul className={style.ul_produtos}>
            {lista_produtos.map((x, y) => <Lista_Produtos key={y} link={link} info={x}/>)}
          </ul>
        </div>
    </section>  
  )
}

export default MaisVendidos