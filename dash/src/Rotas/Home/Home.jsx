import React from 'react'
import style from './Home.module.css'
import { useStorage } from '../../Global/Storage'
import { Link } from 'react-router-dom'

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
                    <ul className={style.links}>
                        <h2 className={style.titulo}>Mais acessados</h2>
                        {ordenar.map((x, y) => <li key={y}><Link to={`/${x.link}`}>{x.link}</Link></li>)}
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Home