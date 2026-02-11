import React from 'react'
import style from './InputImagens.module.css'
import { useStorage } from '../../../../Global/Storage'

import Plus from '/assets/imgs/plus.svg?react'
import Trash from '/assets/imgs/trash.svg?react'


const InputImagens = ({setImagens, imagens, produto, setRemover}) => {
    const {link} = React.useContext(useStorage)

    const handleClick = (x, y) =>{
        console.log('-----------------------------------------------');
        console.log(x);       
        console.log(y);       
        console.log('-----------------------------------------------');
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
                        <figure>
                            <div className={style.svg} onClick={e => console.log(x)}>
                                <Trash />
                            </div>
                            <img key={y} src={URL.createObjectURL(x)}/>
                        </figure>))}



                    {produto.imagens.map((x, y) => (
                        <figure>
                            <div className={style.svg} onClick={handleClick}>
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