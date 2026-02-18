import React from 'react'
import style from './Destaques.module.css'
import { useStorage } from '../../Global/Storage'
import Tabela from './Tabela/Tabela'
import ItensDestaques from './ItensDestaques/ItensDestaques'

const Destaques = ({}) => {
    const {setPagina, login, token, link} = React.useContext(useStorage)

    const [produtosEmDestaques, setProdutosEmDestaques] = React.useState([]) 
    const [produtos, setProdutos] = React.useState([])



    React.useEffect(()=>{
        const resp_produtos_destaques = produtos.filter(x => x.destaque)
        setProdutosEmDestaques(resp_produtos_destaques)
    },[produtos])


    const puxarProdutos = async () =>{
        const options = {method: 'GET', headers: {token, username: login.username}}
        const get = await fetch(link + '/api/produtos/lista', options)
        const resp = await get.json()

        if(resp.status) {
            setProdutos(resp.produtos)
        }
    }

    console.log(produtosEmDestaques);
    
    React.useEffect(()=>{
        setPagina('destaques')
        document.title = 'Produtos em destaques'
        puxarProdutos()
    },[])

    return (
        <div className={style.main}>
            <div className={style.destaques}>
                <h2 className={style.titulo}>Destaques</h2>

                <div className={style.itens_em_destaque}>
                    <ul className={style.ul_destaque}>
                        {produtosEmDestaques.map((x, y) => <ItensDestaques key={y} item={x}/>)}
                        <li className={style.li_add}></li>
                    </ul>
                </div>
            </div>

            <div className={style.lista_de_produtos}>
                <h2 className={style.titulo}>Lista de todos os produtos</h2>
                <Tabela produtos={produtos} setProdutos={setProdutos}/>
            </div>
        </div>
    )
}

export default Destaques