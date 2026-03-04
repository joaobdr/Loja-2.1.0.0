import React from 'react'
import style from './Cupons.module.css'
import { useStorage } from '../../Global/Storage'
import CuponsAtivos from './CuponsAtivos/CuponsAtivos'
import Pesquisa from './Pesquisa/Pesquisa'
import CriarCupom from './CriarCupom/CriarCupom'


const Cupons = ({}) => {
    const {setPagina, token, login, link} = React.useContext(useStorage)
    const [cupons, setCupons] = React.useState([])
    const [filtros, setFiltros] = React.useState({ativos: 'todos', pesquisa: ''})

    const puxarCupons = async e =>{
        const options = {method: 'GET', headers: {token, username: login.username}}

        try {
            const get = await fetch(link + '/api/cupons/lista',options)
            const resp = await get.json()

            if(resp.status){
                setCupons(resp.lista)
            }            
        } catch (error) {
            console.log(error);
        }
    }


    React.useEffect(()=>{
        setPagina('cupons')
        document.title = 'Gerenciamento de cupons'

        puxarCupons()
    },[])

    return   (
        <div className={style.main}>
            <div className={style.pesquisa_e_create}>
                <Pesquisa setFiltros={setFiltros} filtros={filtros}/>
                <CriarCupom setCupons={setCupons}/>
            </div>
            
            <section className={style.cupons_ativos}>
                <h2 className={style.titulo}>Lista de cupons</h2>                
                <ul className={style.ul_cupons_ativos}>
                    <li>
                        <p>Cupom</p>
                        <p>Desconto</p>
                        <p>Usados</p>
                        <p>Limite</p>
                        <p>Validade</p>
                        <p>status</p>
                        <p>Opções</p>
                    </li>
                    {cupons.map((x, y) => <CuponsAtivos key={y} setCupons={setCupons} cupom={x} filtros={filtros}/>)}
                </ul>
            </section>            
        </div>
    )
}


export default Cupons