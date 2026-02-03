import React from 'react'
import style from './Header.module.css'
import { useStorage } from '../Storage'

import Arrow from '../../../assets/imgs/Arrow.svg?react'

const Header = ({}) => {
    const {login} = React.useContext(useStorage)
    

    return (
        <div className={style.header}>
            <ul className={style.ul_info}> 
                <li>{login.cargo}</li>
                <li>
                    <p>{login.username}</p>
                    <Arrow />
                </li>
            </ul>
        </div>
    )
}

export default Header