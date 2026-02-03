import React from 'react'
import style from './Checkout.module.css'
import SectionSemLogin from './Componentes/SectionSemLogin/SectionSemLogin';
import FinalizarCompra from './Componentes/FinalizarCompra/FinalizarCompra';

const Checkout = ({carrinho, link, usuario, setUsuario, setCarrinho}) => {

    React.useEffect(()=>{
        document.title = 'Checkout'
    },[])

    return (
        <main className={`container ${style.main}`}>
            <h1 className={style.titulo}>Finalize seu pedido</h1>
            <div className={style.section}>
                {usuario ? <FinalizarCompra link={link} carrinho={carrinho} setCarrinho={setCarrinho} /> : <SectionSemLogin link={link} setUsuario={setUsuario} usuario={usuario} carrinho={carrinho}/>}
            </div>
        </main>
    )
}

export default Checkout 