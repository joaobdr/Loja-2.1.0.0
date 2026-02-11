import React from 'react'
import style from './Cadastrar.module.css'
import FormCadastro from './FormCadastro/FormCadastro'
import { useStorage } from '../../Global/Storage'

const Cadastrar = () => {
    const {maisAcessados, setMaisAcessados, setPagina} = React.useContext(useStorage)
    
    React.useEffect(()=>{
        setPagina('cadastrar')      
        document.title = 'Cadastrar produtos'
    },[])


    return (
        <div className={style.main}>
            <h2 className={style.titulo}>Cadastro de produtos</h2>

            <section className={style.section}>
                <FormCadastro />
            </section>
        </div>
    )
}


export default Cadastrar