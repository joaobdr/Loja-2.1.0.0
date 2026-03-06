import React from 'react'
import {Link} from 'react-router-dom'
import style from './MenuLateral.module.css'


const MenuLateral = () => {

  return (
    <aside className={style.aside}>
        <section>
            <Link to='/' className={style.logo}>dashboard</Link>

            <ul className={style.ul_menu}>
              <li><Link to="cadastrar">Cadastrar</Link></li>
            </ul>
        </section>
    </aside>
  )
}

export default MenuLateral