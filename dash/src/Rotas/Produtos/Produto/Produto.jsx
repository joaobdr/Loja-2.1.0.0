import React from 'react'
import style from './Produto.module.css'
import { useStorage } from '../../../Global/Storage'


import Edit from '/assets/imgs/Edit.svg?react'


const Produto = ({produto, filtros, search,setJanela}) => {
    const {login} = React.useContext(useStorage)
    const cargos = ['root', 'admin', 'adm']    

    //Sei que o js faz isso nativamente, mais gostaia de da uma preaticada. para não perder a pratica ;)
    const formatarPreco = e =>{
        const inteiro = `${e}`.split('.')[0].split('').reverse()
        const decimal = `${e.toFixed(2)}`.split('.')[1]
        let num = '';
        
        if(inteiro.length > 3) {            
            for (let i = 0; i < inteiro.length; i++) {
                
                if(i === 0)  num = `${num}${inteiro[i]}`
                else if(!(i%3)) num = `${num}.${inteiro[i]}`
                else num = `${num}${inteiro[i]}`
            }
        }else{            
            num = (inteiro.reverse().join(''));
        }   
        const valor = `${num.split('').reverse().join('')},${decimal}`
        return `R$ ${valor}`
    }

    if(filtros.estoque === 'sem'){
        if((produto.estoque <= 0)) return null          
    }
    if(filtros.estoque === 'com'){
        if((produto.estoque > 0)) return null;           
    }
    if(filtros.categoria !== 'all') if(!(filtros.categoria === produto.categoria)) return null
    if(!(produto.codigo.toLowerCase().includes(search.toLowerCase()) || produto.nome.toLowerCase().includes(search.toLowerCase())))return null

    
    
    
    return (
        <>
            <tr>
                <td>{produto.codigo}</td>
                <td>{produto.nome}</td>
                <td>{produto.categoria}</td>
                <td>{produto.estoque}</td>
                {cargos.includes(login.cargo) ? <td>{formatarPreco(produto.custo)}</td> : null}
                <td>{formatarPreco(produto.preco)}</td>
                {cargos.includes(login.cargo) ? <td><Edit onClick={e => setJanela(produto)}/></td> : null}
            </tr>
        </>
    )
}

export default Produto