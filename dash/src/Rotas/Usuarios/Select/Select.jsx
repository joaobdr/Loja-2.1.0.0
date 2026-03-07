import React from 'react'
import style from './Select.module.css'


const Select = ({setPerfil, perfil}) => {





    return (
        <div className={style.select}>
            <label htmlFor="select-perfil">Perfil</label>

            <select name="select-perfil" id="select-perfil" value={perfil} onChange={e => setPerfil(e.target.value)}>
                <option value="desabilitado">desabilitado</option>
                <option value="padrao">padrao</option>
                <option value="administrador">Administrador</option>
                <option value="fundador">Fundador</option>
                <option value="root">Root</option>
            </select>
            
        </div>
    )
}

export default Select