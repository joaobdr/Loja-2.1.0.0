import React from 'react'
import Lista_Produtos from '../../../../Global/Lista_produtos/Lista_Produtos'
import style from './Produtos.module.css'
import Loading from '../../../../Global/Loading/Loading'
import { Link } from 'react-router-dom';
import  Next from '../../../../../assets/imgs/site/next.svg?react';

const Produtos = ({link}) => {
  const [listaProdutos, setListaProdutos] = React.useState([])
  const [pagina, setPagina] = React.useState(1)
  

  const puxarProdutos = async () =>{
    const GET = await fetch(link + `/api/loja/produtos/lista-completa?page=${pagina}`)
    const RESP = await GET.json()
    
    setListaProdutos(RESP.list);    
  }

  React.useEffect(()=>{
    puxarProdutos()
  },[])

  return (
    <section className={`container ${style.section}`}>
        <h2 className={style.titulo}>Todos os produtos <Link to={`/todos-produtos`}>Mais itens <Next /></Link></h2>

        <div className={style.div_lista_de_produtos}>
          {!listaProdutos[0] && <Loading />}
          <ul className={style.ul_lista_de_produtos}>
            {listaProdutos.map((x, y) => <Lista_Produtos key={y} link={link} info={x}/>)}
          </ul>
        </div>

    </section>
  )
}

export default Produtos