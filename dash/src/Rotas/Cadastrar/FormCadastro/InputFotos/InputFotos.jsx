import React from 'react'
import style from './InputFotos.module.css'

import Plus from '/assets/imgs/plus.svg?react'
import Trash from '/assets/imgs/Trash.svg?react'


const InputFotos = ({imagens, setImagens}) => {

    const handleChange = e =>{
        setImagens(prev => [    
            ...prev,
            ...Array.from(e.target.files)
        ])
    }
    
    const handleClick = e =>{
        const foto = Number(e.currentTarget.dataset.foto)
        setImagens(prev => prev.filter((_, i) => foto !== i))
    }
    


    return (
        <div className={style.fotos}>
            <ul className={style.fotos_produto}>
                {imagens.map((x, y) =>(
                    <li key={y} className={style.li} >
                        <img src={URL.createObjectURL(x)}/>
                        <div onClick={handleClick} data-foto={y}><Trash/></div>
                    </li>))}

                <li className={style.add_foto}>
                    <label className={style.label}>
                        
                        <Plus />

                        <input 
                            type="file" 
                            accept='image/*' 
                            multiple 
                            onChange={handleChange} 
                        />
                    </label>
                </li>
            </ul>
        </div>
    )
}

export default InputFotos