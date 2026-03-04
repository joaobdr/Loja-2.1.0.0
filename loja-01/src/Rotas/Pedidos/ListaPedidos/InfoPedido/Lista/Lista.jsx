import React from 'react'
import style from './Lista.module.css'
import { Link } from 'react-router-dom';

const Lista = ({link, produto}) => {
    const [info, setInfo] = React.useState(null)
    
    const formatado = (+produto.preco).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    React.useEffect(() =>{
        const init = async e =>{
            const ts = await fetch(link + `/api/loja/produtos/detalhe-do-produto/?codigo=${produto.codigo}`)
            const RESP = await ts.json()

            setInfo(RESP.produto);          
        }
        init()
    },[])

    return (
        <li className={style.lista}>
            {info && (
                <>
                    <figure className={style.figure}>
                        <img src={link + info.fotos[0]} alt="" />
                    </figure>
                    <div className={style.info_produto}>
                        <h3 className={style.titulo}>{info.produto}</h3>

                        <div className={style.qtd_valor} >
                            <p>Quantidade: <span>{produto.qtd}</span></p>
                            <p>preço por unidade: <span>{formatado}</span></p>

                            <Link to={`/produto/${produto.codigo}`} className={style.btn_produto}>Ver produto</Link>
                        </div>
                    </div>
                </>
            )}
        </li>
    )
}

export default Lista