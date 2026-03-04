import React from 'react'
import style from './Home.module.css'
import Intro from './Componentes/Intro/Intro'
import Produtos from './Componentes/Produtos/Produtos'
import MaisVendidos from './Componentes/MaisVendidos/MaisVendidos'

const Home = ({link}) => {

  React.useEffect(()=>{
    document.title = 'BDR Store - A melhor loja de vendas online'
  },[])

  return (
    <main className={style.main}>
      <Intro link={link}/>
      <MaisVendidos link={link} />
      <Produtos link={link} />
    </main>
  )
}

export default Home