import React from 'react'
import style from './Intro.module.css'
import Conteudo from './Frag/Conteudo'
  

const Intro = ({link}) => {
  const [index, setIndex] = React.useState(0);
  const [produtosEmDestauques, setProdutosEmDestauques] = React.useState([])


  const puxarDestaques = async e =>{
    const GET = await fetch(link + '/api/loja/produtos/destaque/lista')
    const RESP = await GET.json()

    if(RESP.status) {
      setProdutosEmDestauques(RESP.list)
    }
  }

  React.useEffect(() => {
    puxarDestaques();
  }, []);

  React.useEffect(() => {
    if (produtosEmDestauques.length === 0) return;

    const intervalo = setInterval(() => {
      setIndex(prev => (prev + 1) % produtosEmDestauques.length);
    }, 7500);

    return () => clearInterval(intervalo);
  }, [produtosEmDestauques]); 



  return (
    <section className={style.section_intro}>
        {produtosEmDestauques.map((x, y) => <img key={y} src={`${x.img_fundo ? link + x.img_fundo : link + '/assets/imgs/home-01.jpg'}`} className={`${style.img_fundo_intro} ${y === index ? style.active : ''}`}  />)}

        <span className={style.span_fotos}>
          {produtosEmDestauques.map((x, y) => <div key={y} className={`${style.div_fotos} ${y == index ? style.active : ''}`} onClick={e=> setIndex(y)}></div>)}
        </span>

        <div className={'container ' + style.conteudo}>
          {produtosEmDestauques.map((x, y) => (<Conteudo key={y} content={x} activeDiv={y == index ? true : false} link={link} />)  )}
        </div>
    </section>
  )
}

export default Intro