import React from 'react'
import Load from './Load/Load'
import.meta.env

export const useStorage = React.createContext()

export const Storage = ({children}) => {
    const tm = localStorage.getItem('tema') ? JSON.parse(localStorage.getItem('tema')).tema : true;
    const ls = localStorage['mais-acessados'] ? JSON.parse(localStorage['mais-acessados']) : [];
    
    const link = import.meta.env.VITE_API
    const cargos = ['addm', 'admin', 'root']
    const [login, setLogin] = React.useState(null)
    const [token, setToken] = React.useState(null)
    const [tema, setTema] = React.useState(tm)
    const [loading, setLoading] = React.useState(true)
    const [maisAcessados, setMaisAcessados] = React.useState(ls)
    const [pagina, setPagina] = React.useState(null)
    
    
    const formatado = valor =>{return valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}

    const verificarToken = async e =>{
        setLoading(true)
        const username = window.localStorage.usuario ? JSON.parse(window.localStorage.usuario).username : null
        const verifToken = window.localStorage.token
        
        if(!username || !verifToken) {
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('usuario')
            return setLoading(false)
        }

        const options = {method: 'GET', headers: {token: verifToken, username}}

        try {
            const post = await fetch(link + '/api/token', options)
            if(!post.ok) throw new Error('Erro na requisição')
            const resp = await post.json()            

            if(resp.status){
                setLogin(resp.info_user)
                setToken(verifToken)
            }else{
                window.localStorage.removeItem('token')
                window.localStorage.removeItem('usuario')
            }
        } finally{
            setLoading(false)
        }
    }

    React.useEffect(()=>{
        const ts = () =>{
            if(!pagina) return 
            setMaisAcessados(prev => {
                const existe = prev.find(x => x.link === pagina)

                if(!existe){
                    return [...prev, {link: pagina, acess: 1}]
                }

                return prev.map(x =>
                    x.link === pagina
                        ? {...x, acess: Number(x.acess) + 1}
                        : x
                )
            })
        }
        ts()
    },[pagina])

    React.useEffect(()=>{
        console.log('tema ===='. tema);
        
        document.documentElement.setAttribute('data-tema', tema ? 'escuro' : 'claro');
        localStorage.setItem("tema", JSON.stringify({tema}));
    }, [tema])

    React.useEffect(() => {        
        window.localStorage.setItem('mais-acessados', JSON.stringify(maisAcessados))        
    }, [maisAcessados])

    React.useEffect(()=>{verificarToken()},[])

  return (
    <useStorage.Provider value={
        {login, setLogin, link, token, setToken, setMaisAcessados, setTema, tema, maisAcessados, setPagina, pagina, cargos, formatado}
        }>
        {loading ? <Load width="100%" height="100vh"/> : children}
    </useStorage.Provider>
  )
}
