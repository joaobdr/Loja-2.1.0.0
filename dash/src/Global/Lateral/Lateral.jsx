import React from 'react'
import style from './Lateral.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useStorage } from '../Storage'

import Sun from '/assets/imgs/sun.svg?react'
import Moon from '/assets/imgs/moon.svg?react'

const Lateral = ({}) => {
    const {setTema, tema, maisAcessados, login, cargos} = React.useContext(useStorage)
    const location = useLocation()
    const ordenar = maisAcessados.sort((x, y) => y.acess - x.acess)    

    return (
        <div className={style.lateral}>
            <Link to="/">
                <h2 className={style.titulo}>Loja</h2>
            </Link>

            {/* <ul className={style.menu}>
                {cargos.includes(login.cargo) && <li><Link className={location.pathname === '/cadastrar' ? style.active : ''} to='/cadastrar'>Cadastrar</Link></li>}
                <li><Link className={location.pathname === '/produtos' ? style.active : ''} to='/produtos'>Produtos</Link></li>
                <li><Link className={location.pathname === '/destaques' ? style.active : ''} to='/destaques'>Destaques</Link></li>
                <li><Link className={location.pathname === '/promocoes' ? style.active : ''} to='/promocoes'>Promoções</Link></li>
            </ul> */}

            <ul className={style.menu}>
                {ordenar.map((x, y) => <li key={y}><Link className={location.pathname === `/${x.link}` ? style.active : ''} to={`/${x.link}`}>{x.link}</Link></li>)}
            </ul>


            <div className={style.btns}>
                <div className={style.tema}>
                    <button className={!tema ? style.active : ''} onClick={e => setTema(false)}><Sun/></button>
                    <button className={!tema ? '' : style.active}  onClick={e => setTema(true)}><Moon/></button>
                </div>

                <span className={style.sair}>Sair</span>
            </div>
        </div>
    )
}

export default Lateral