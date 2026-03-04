import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {  useStorage } from './Global/Storage'
import Login from './Rotas/Login/Login'
import Home from './Rotas/Home/Home'
import Header from './Global/Header/Header'
import MenuLateral from './Global/MenuLateral/MenuLateral'
import Cadastrar from './Rotas/Cadastrar/Cadastrar'
import Lateral from './Global/Lateral/Lateral'
import Produtos from './Rotas/Produtos/Produtos'
import Destaques from './Rotas/Destaques/Destaques'
import Promocoes from './Rotas/Promocoes/Promocoes'
import Cupons from './Rotas/Cupons/Cupons'

const Rotas = () => {
    const {login} = React.useContext(useStorage)


    if(!login){
        return (
            <Routes>
                <Route path="/*" element={<Login />}/>
            </Routes>)

    }


    return (

        <>
            {/* <MenuLateral /> */}
            <Header />
            <Lateral />
            <main className='main'>
                <Routes>
                    <Route path="/cadastrar" element={<Cadastrar />}/>
                    <Route path="/produtos" element={<Produtos />}/>
                    <Route path="/destaques" element={<Destaques />}/>
                    <Route path="/promocoes" element={<Promocoes />}/>
                    <Route path="/cupons" element={<Cupons />}/>
                    <Route path="/*" element={<Home />}/>
                </Routes>
            </main>
        </>
    )
}

export default Rotas