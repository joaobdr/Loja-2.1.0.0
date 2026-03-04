import React from 'react'
import style from './CriarCupom.module.css'
import Janela from './Janela/Janela'


import Plus from '/assets/imgs/plus.svg?react'

const CriarCupom = ({setCupons}) => {
    const [disabled, setDisabled] = React.useState(false)



    return (
        <>
            <button className={style.button_create} onClick={() => setDisabled(true)}>
                <Plus />
            </button>
            
            {disabled && <Janela setDisabled={setDisabled} setCupons={setCupons}/>}
        </>
    )
}

export default CriarCupom