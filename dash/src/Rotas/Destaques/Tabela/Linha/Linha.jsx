import React, { useState } from 'react'
import style from './Linha.module.css'
import { useStorage } from '../../../../Global/Storage'


import Star from '/assets/Imgs/star.svg?react'
import StarFill from '/assets/Imgs/star-fill.svg?react'


const Linha = ({item, setProdutos}) => {
  const {login, token, link} = React.useContext(useStorage)

  const [loading, setLoading] = React.useState(false)


  const addDestaque = async action =>{
    if(loading) return console.log('teste');    
    setLoading(true)    

    const options = {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({token, username: login.username, action, codigo: item.codigo})
    }

    try {
      const post = await fetch(link + '/api/produto/destacar', options)
      const resp = await post.json()

      console.log(resp);

      if(resp.status){
        setProdutos(resp.produtos)
      }else{
        alert(resp.msg)
      }
      
      
    } catch (error) {}finally{

      setLoading(false)
    }
  }


  return (
        <tr className={style.tab}>
            <td>{item.codigo}</td>
            <td>{item.nome}</td>
            <td>{item.preco}</td>
            <td>{item.destaque ? <button onClick={() => addDestaque(false)}><StarFill /></button> : <button onClick={() => addDestaque(true)}><Star /></button>}</td>
        </tr>
  )
}

export default Linha