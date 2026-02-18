import React from 'react'
import style from './Produtos.module.css'
import { useStorage } from '../../Global/Storage'
import Pesquisa from './Pesquisa/Pesquisa'


import Edit from '/assets/imgs/Edit.svg?react'
import Produto from './Produto/Produto'
import EditarProduto from './EditarProduto/EditarProduto'


const Produtos = ({}) => {
    const {setPagina, link, token, login} = React.useContext(useStorage)
    const [produtos, setProdutos] = React.useState([])
    const [search, setSearch] = React.useState('')
    const [filtros, setFiltros] = React.useState({estoque: 'tudo', categoria: 'all'})
    const [janela, setJanela] = React.useState(false)


    const cargos = ['root', 'admin', 'adm']

    const puxarProdutos = async e => {
        const options = {method: 'GET', headers: {token, username: login.username}}
        const get = await fetch(link + '/api/produtos/lista', options)
        const resp = await get.json()

        if(resp.status) setProdutos(resp.produtos)        
    }



    React.useEffect(()=> {
        setPagina('produtos')
        document.title = 'Lista de produtos'
        puxarProdutos()
    },[])

    return (
        <div className={style.main}>
            {janela && <EditarProduto setJanela={setJanela} produto={janela} setProdutos={setProdutos}/>}
            
            <Pesquisa setFiltros={setFiltros} filtros={filtros} setSearch={setSearch} search={search} produtos={produtos} />
            <div className={style.content}>

                <table border="1">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Estoque</th>
                            { cargos.includes(login.cargo) ? <th>Custo</th> : null}
                            <th>Preço</th>
                            { cargos.includes(login.cargo) ? <th>Ações</th> : null}
                        </tr>
                    </thead>

                    <tbody>
                        {produtos.map((produto, i) => <Produto key={i} produto={produto} filtros={filtros} search={search} setJanela={setJanela}/>)}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Produtos