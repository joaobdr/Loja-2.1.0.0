import React from 'react'
import style from './Pedidos.module.css'
import ListaPedidos from './ListaPedidos/ListaPedidos'


const Pedidos = ({link}) => {
  const token = localStorage.token
  const [listaPedidos, setListaPedidos] = React.useState([])
  
  React.useState(() =>{
    const attPedidos = async e =>{
      const GET = await fetch(link + `/api/loja/pedidos?token=${token}`)
      const RESP = await GET.json()

      if(RESP.status){
        setListaPedidos(RESP.pedidos);
        
      }
    } 
    attPedidos()

    document.title = 'Meus pedidos'
  },[])

  return (
    <main className={`container ${style.main}`}>
      <div className={style.div_pai}>

        <h3 className={style.titulo}>Meus Pedidos</h3>

        <ul className={style.ul_lista_pedidos}>
          {listaPedidos && listaPedidos.map((x, y) => <ListaPedidos key={y} link={link} info={x }/>)}
        </ul>
      </div>
    </main>
  )
}

export default Pedidos