import React from 'react'
import Load from './Load/Load'

export const useStorage = React.createContext()

export const Storage = ({children}) => {
    const link = 'http://localhost:3000'
    const [login, setLogin] = React.useState(null)
    const [token, setToken] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    
    const verificarToken = async e =>{
        setLoading(true)
        const username = window.localStorage.usuario ? JSON.parse(window.localStorage.usuario).username : null
        const verifToken = window.localStorage.token
        
        if(!username && !verifToken) {
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('usuario')
            return setLoading(false)
        }

        const options = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({username, verifToken})
        }

        try {
            const post = await fetch(link + '/api/login', options)
            const resp = await post.json()

            if(resp.status){
                setLogin(resp.info_user)
                setToken(verifToken)
                setLogin(resp.info_user)
            }else{
                window.localStorage.removeItem('token')
                window.localStorage.removeItem('usuario')
            }
        } finally{
            setLoading(false)
        }


    }

    React.useEffect(()=>{
        verificarToken()
        
    },[])



  return (
    <useStorage.Provider value={{login, setLogin, link, token, setToken}}>
        {loading ? <Load width="100%" height="100vh"/> : children}
    </useStorage.Provider>
  )
}
