import React from 'react'
import style from './Style.module.css'
import { Link } from 'react-router-dom'


const Conteudo = ({content, activeDiv, link}) => {  
    const cor = "#" + Math.floor(Math.random() * 16777215).toString(16);

//     function gerarCorHex() {
//         const cor = "#" + Math.floor(Math.random() * 16777215).toString(16);
//         return cor;
//     }

// console.log(gerarCorHex());


    return (
        <div className={`${style.div_content} ${activeDiv ? style.active : ''}`}>
            <div className={style.textos}>
                <h3 className={style.titulo}>{content.produto}</h3>

                <figure className={style.figure_responsivo}><img src={link + content.fotos[0]} style={{borderColor: cor}} alt="" /></figure>

                <p>{content.descricao}</p>

                <Link to={`/produto/${content.codigo}`} style={{backgroundColor: cor}}>Adquirir produto</Link>
            </div>
            
            <figure className={style.figure}>
                <img src={link + content.fotos[0]} style={{borderColor: cor}} alt="" />
            </figure>
        </div>
        )
}

export default Conteudo