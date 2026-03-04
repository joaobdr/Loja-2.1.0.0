import { useParams } from "react-router-dom";
import React from 'react'
import style from './Produto.module.css'
import Loading from "../../Global/Loading/Loading";
import DetalheProduto from "./Frag/DetalheProduto/DetalheProduto";
import ProdutoNaoEncontrado from "./Frag/ProdutoNaoEncontrado/ProdutoNaoEncontrado";
import Lista_Produto from '../../Global/Lista_produtos/Lista_Produtos'

const Produto = ({link, usuario, carrinho, setCarrinho}) => {
  const [produto, setProduto] = React.useState(null)
  const [recomendados, setRecomendados] = React.useState(null)
  const { codigo } = useParams();
  

  const puxarProduto = async e =>{
    const GET = await fetch(link + `/api/loja/produtos/detalhe-do-produto/?codigo=${codigo}`)
    const RESP = await GET.json()

    console.log(RESP.produto);
    
    setProduto(RESP.produto)
    setRecomendados(RESP.recomentados)

    return document.title = RESP.produto.produto
  }
  
  React.useEffect(()=>{
    puxarProduto();        
  },[codigo])

  return (
    <main className={style.main}>
        {produto && <img src={`${produto.img_fundo ? link + produto.img_fundo : link + '/assets/imgs/home-01.jpg'}`} className={`${style.img_fundo_intro}`} />}
      <section className={`container ${style.section}`}>
        {(produto) ?  <DetalheProduto link={link} content={produto} usuario={usuario} carrinho={carrinho} setCarrinho={setCarrinho}/> : <ProdutoNaoEncontrado />}
      </section>      

      <section className={`container ${style.section_recomendados}`}>
        <h4 className={style.titulo}>Recomendados</h4>
        <div className={style.div_recomendados}>
          <ul>
            {recomendados ? recomendados.map((x, y) => <Lista_Produto key={y} link={link} info={x} />) : null}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default Produto