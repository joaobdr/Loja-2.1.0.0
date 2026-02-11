import React from 'react'
import style from './Header.module.css'
import { useStorage } from '../Storage'

import Arrow from '../../../assets/imgs/Arrow.svg?react'

const Header = ({}) => {
    const {login, pagina} = React.useContext(useStorage)
    

    return (
        <div className={style.header}>
            <ul className={style.ul_info}> 
                <li>{login.cargo}</li>
                <li>{pagina || "Home"}</li>
                <li>
                    <p className={style.nome}>{login.username[0].toUpperCase()}</p>
                    {/* <Arrow /> */}
                </li>
            </ul>
        </div>
    )
}

export default Header