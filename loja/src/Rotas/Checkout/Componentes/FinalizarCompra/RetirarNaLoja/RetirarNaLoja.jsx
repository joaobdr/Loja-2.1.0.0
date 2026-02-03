import React from 'react'
import style from './RetirarNaLoja.module.css'
import { Link } from 'react-router-dom'

const RetirarNaLoja = ({tipo, setTipo}) => {

  return (
    <div className={style.div_pai}>
      <label className={style.radio}>
        <input type="radio" name="info-entrega-ou-retirada" value="retirada" checked={tipo === 'retirada'} onChange={e => setTipo(e.target.value)}/>
        <span className={style.checkmark}></span>
        Retirar na loja
      </label>

        <div className={style.info_loja}>
          <h5 className={style.titulo}>Informações para a retirada</h5>

          <div className={style.div_info}>
            <p>Cidade: <span>Rio de janeiro</span></p>
            <p>Endereco: <span>Rua qualquer coisa N° 999 LJ 3B</span></p>
          </div>
          <p className={style.info}>
            OBS: Assim que o pagamento for confirmado, o pedido será atualizado em <Link to='/meus-pedidos'>Meus Pedidos</Link> e já poderá ser retirado na loja.
          </p>
        </div>
    </div>
  )
}

export default RetirarNaLoja
