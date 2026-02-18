import React from 'react'
import style from './InputImagens.module.css'
import { useStorage } from '../../../../Global/Storage'

import Plus from '/assets/imgs/plus.svg?react'
import Trash from '/assets/imgs/trash.svg?react'


const InputImagens = ({setImagens, imagens, produto, setRemover, setImagemBack}) => {
    const {link} = React.useContext(useStorage)

    const handleClick = (tipo, index) =>{
        if(tipo === 'back'){
            const novo = produto.filter(img => img !== produto[index])
            setImagemBack(novo);
        }
        if(tipo === 'front'){
            const novo = imagens.filter((img, i) => i !== index)
            setImagens(novo)
        }
    }


    return (
            <div className={style.imgs}>
                <label className={style.btn_remover_img}>
                    <input 
                        type="file" 
                        accept='image/*' 
                        multiple 
                        onChange={e => setImagens(prev => [...prev, ...Array.from(e.target.files)])}/>
                        
                        <Plus />
                </label>


                <div className={style.div}>
                    {imagens.map((x, y) => (
                        <figure key={y}>
                            <div className={style.svg} onClick={() => handleClick('front', y)}>
                                <Trash />
                            </div>
                            <img key={y} src={URL.createObjectURL(x)}/>
                        </figure>))}



                    {produto.map((x, y) => (
                        <figure key={y}>
                            <div className={style.svg} onClick={() => handleClick('back', y)}>
                                <Trash />
                            </div>
                            <img key={y} src={link + x}/>
                        </figure>
                        ))}
                </div>
            </div>
    )
}

export default InputImagens