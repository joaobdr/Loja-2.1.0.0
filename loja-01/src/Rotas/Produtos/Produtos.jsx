import React from 'react'
import style from './Produtos.module.css'
import Lista_produtos from '../../Global/Lista_produtos/Lista_Produtos'
import Loading from '../../Global/Loading/Loading'
import Pesquisar from './Frag/Pesquisar/PEsquisar'

const Produtos = ({link}) => {
    const [listaProdutos, setListaProdutos] = React.useState([])
    const [pagina, setPagina] = React.useState(1)

    const puxarProdutos = async () =>{
        // const GET = await fetch(link + `/api/loja/produtos/lista-completa/?page=${pagina}`)
        const GET = await fetch(link + `/api/loja/produtos/lista-completa/`)
        const RESP = await GET.json()
        
        setListaProdutos(RESP.list);    
        console.log(RESP);
        
    }

    React.useEffect(()=>{
        puxarProdutos()
    },[])


  return (
    <main className={style.main}>
        <section className={`container  ${style.section}`}>
            <Pesquisar />
            
            <div className={style.div_de_produtos}>
                {!listaProdutos[0] && <Loading />}
                <ul className={style.ul_de_produtos}>
                    {listaProdutos.map((x, y) => <Lista_produtos key={y} link={link} info={x} />)}
                </ul>

                <span className={style.paginas}>Paginas</span>
            </div>
        </section>
    </main>
  )
}

export default Produtos