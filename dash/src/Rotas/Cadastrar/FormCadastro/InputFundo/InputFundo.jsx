import React from 'react'
import style from './InputFundo.module.css'


//*********************     SVGs    *******************
import Plus from '/assets/imgs/plus.svg?react'


const InputFundo = ({fundo, setFundo, link}) => {
    const [fotoM, setFotoM] = React.useState(false) //indoca a animação de adicionar outro fundo na imagem de fundo

    return (
        <div className={style.img_fundo} onMouseEnter={e => setFotoM(true)} onMouseLeave={e => setFotoM(false)}>
            <label className={style.div_plus} style={{display: fotoM ? 'flex' : 'none'}}>
                <Plus/>
                <input type="file" accept='image/*' onChange={e => setFundo(e.target.files[0])}/>
            </label>
            <img src={ typeof(fundo) === 'string' ? link + fundo : URL.createObjectURL(fundo)} alt="" />
        </div>
    )
}

export default InputFundo