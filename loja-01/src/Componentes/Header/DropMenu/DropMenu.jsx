import React from 'react'
import style from './DropMenu.module.css'
import { Link, useNavigate } from 'react-router-dom';

const DropMenu = ({setUsuario, setDrop}) => {
    const navigate = useNavigate()

    const handleSair = e => {
        e.preventDefault();
        setUsuario(false)
        localStorage.removeItem('token');        
        return navigate('/')
    }

    return (
        <ul className={style.ul}>
            <li><Link to="/meus-pedidos" onClick={e => setDrop(false)}>Meus pedidos</Link></li>
            <li><a href="#" onClick={handleSair}>Sair</a></li>
        </ul>
    )
}

export default DropMenu