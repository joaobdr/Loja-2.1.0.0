import React from 'react'
import style from './Header.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'

import  Search from '../../../assets/imgs/site/search.svg?react';
import  User from '../../../assets/imgs/site/user.svg?react';
import  Moon from '../../../assets/imgs/site/moon.svg?react';
import  Sun from '../../../assets/imgs/site/sun.svg?react';
import  Bag from '../../../assets/imgs/site/bag.svg?react';
import DropMenu from './DropMenu/DropMenu';

const Header = ({tema, setTema, usuario, carrinho, setUsuario}) => {
  // const [search, setSearch] = React.useState(false)
  const [scroll, setScroll] = React.useState(false)
  const [drop, setDrop] = React.useState(false)
  const menuRef = React.useRef(null)

  const scrollTop = e =>document.documentElement.scrollTop = 0
  
  React.useEffect(()=>{
    const handleScroll = () => {
      // Se rolou mais de 50px, ativa o estado
      setScroll(window.scrollY > 50);
    };
      const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setDrop(false)
    }
  }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener("scroll", handleScroll);

    return () =>{
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener("scroll", handleScroll);
    }
  },[])
  
  return (
    <header className={`${style.header} ${scroll ? style.scroll : ""}`}>
        <section className={`container ${style.section_header}  ${scroll ? style.scroll : ""}`}>
          <ul className={style.ul_header}>
              <li><Link to="/" onClick={scrollTop}>Inicio</Link></li>
              <li><Link to="/promocoes-exclusivas">Promoções</Link></li>
              <li><Link to="/todos-produtos">Produtos</Link></li>
              <li><Link to="/contato">Contato</Link></li>
          </ul>

          <div className={style.div_logo}>
            <Link to='/' onClick={scrollTop} className={style.logo}>BDR</Link>
          </div>

          <ul className={style.ul_header}>
              {/* <li>
                  <label className={`${style.input_header} ${search ? style.input_header_active : ''}`} htmlFor="search-header">
                    <input type="search" id='search-header' name='search-header' className={`${style.input_pesquisa} ${search ? style.input_visivel : ''}`}/>
                    <Search htmlFor="search-header" onClick={e => setSearch(!search)}/>
                  </label>
              </li>    */}

              <li>
                <a  href='#' className={`${style.tema} ${style.link}`}>
                  <Moon onClick={e => setTema(true)} className={tema ? '' : style.active}/> 
                  <Sun onClick={e => setTema(false)} className={tema ? style.active : ''}/>
                </a>
              </li>

              <li className={style.carrinho}>
                <Link className={style.link} to='/carrinho'>
                  {carrinho[0] ? <span>{carrinho.length}</span> : null}
                  <Bag />
                </Link>
              </li>  

              <li className={style.li_user}>
                {!usuario && <Link className={style.link} to={`/login`}><User /></Link>}
                {usuario && (
                  <div ref={menuRef} className={style.user_wrapper}>
                    <button
                      type="button"
                      onClick={() => setDrop(!drop)}
                      className={style.link}
                    >
                      <p>{usuario.nome[0]}</p>
                    </button>

                    {drop && <DropMenu setUsuario={setUsuario} setDrop={setDrop} />}
                  </div>
                )}

              </li>           
          </ul>
        </section>
    </header>
  )
}

export default React.memo(Header)