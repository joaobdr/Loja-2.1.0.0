import React from 'react'
import style from './Home.module.css'
import { useStorage } from '../../Global/Storage'

const Home = ({}) => {
    const {token, login} = React.useContext(useStorage)

    React.useEffect(()=> {document.title = 'Dashboard - Pagina principal'} , [])    

    return (
        <>
            HOME
        </>
    )
}

export default Home