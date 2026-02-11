import React from 'react'
import style from './Lateral.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useStorage } from '../Storage'

import Sun from '/assets/imgs/sun.svg?react'
import Moon from '/assets/imgs/moon.svg?react'

const Lateral = ({}) => {
    const {setTema, tema, setMaisAcessados} = React.useContext(useStorage)
    const location = useLocation()

    return (
        <div className={style.lateral}>
            <Link to="/">
                <h2 className={style.titulo}>Loja</h2>
            </Link>

            <ul className={style.menu}>
                <li><Link className={location.pathname === '/cadastrar' ? style.active : ''} data-link="cadastrar" to='/cadastrar'>Cadastrar</Link></li>
                <li><Link className={location.pathname === '/produtos' ? style.active : ''} data-link="produtos" to='/produtos'>Produtos</Link></li>
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