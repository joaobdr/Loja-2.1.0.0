import React from 'react'
import style from './Home.module.css'
import { useStorage } from '../../Global/Storage'
import { Link } from 'react-router-dom'


import Dolar from '/assets/imgs/dolar.svg?react'
import StarFill from '/assets/imgs/star-fill.svg?react'
import List from '/assets/imgs/lista.svg?react'
import Register from '/assets/imgs/plus.svg?react'
import Desconto from '/assets/imgs/desconto.svg?react'

const Home = ({}) => {
    const {token, login, maisAcessados, setPagina} = React.useContext(useStorage)
    
    React.useEffect(()=> {
        setPagina(null)
        document.title = 'Dashboard - Pagina principal'
    } , [])



    const ordenar = maisAcessados.sort((x, y) => y.acess - x.acess)
    // const ts = Object.keys(maisAcessados) // Keys dos objetos




    return (
        <>
            <section className={style.section}>
                <div className={style.content}>
                    <ul className={style.ul}>
                        <li>
                            <Link to="/cadastrar">
                                <span>Cadastrar</span>
                                <Register />
                            </Link>

                        </li>

                        <li>
                            <Link to="/produtos">
                                <span>Produtos</span>
                                <List />
                            </Link>
                        </li>

                        <li>
                            <Link to="/destaques">
                                <span>Destaques</span>
                                <StarFill />
                            </Link>
                        </li>

                        <li>
                            <Link to="/promocoes">
                                <span>Promoções</span>
                                <Dolar />
                            </Link>
                        </li>

                        <li>
                            <Link to="/cupons">
                                <span>Cupons</span>
                                <Desconto />
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Home