import React from 'react'
import style from './Testes.module.css'

const Testes = ({link}) => {
    const apostas =`03-06-08-30-32-57
                    02-08-11-13-33-51
                    07-13-14-22-51-52
                    09-11-16-22-33-52
                    02-13-14-22-31-42
                    01-11-18-22-38-46
                    11-22-33-44-53-59
                    17-22-31-42-44-57
                    02-09-17-22-27-33
                    06-13-21-28-31-48
                    09-26-34-42-54-57
                    04-09-16-19-22-31
                    05-23-29-31-36-39
                    02-13-31-42-52-56
                    04-21-26-30-36-47
                    14-20-40-50-52-56`
    const [numeros, setNumeros] = React.useState('')

    const handleClick = e =>{
        
    }
    
    

    return (
        <div className={`container ${style.main}`}>
            <section className={style.section}>
                <input type="text" value={numeros} onChange={e => setNumeros(e.target.value)}/>
                <button onClick={handleClick}>Pesquisar</button>

                <ul>
                    {apostas.split(' ').join('').split('\n').map((x, y) =>{

                        return <li key={y}>
                                    {x.split('-').map((e, i) => {   
                                        const ts = numeros.split('-').map(x => x === '' ? '999' : x )
                                        const teste = ts.filter(z => {return z === e})
                                            
                                        
                                        
                                        

                                        return <p key={i} style={!!teste[0] ? {background: 'green'} : {}}>{e}{i == x.split('-').length - 1  ? '' : '-'}</p>
                                    })}
                                </li>
                    })}
                </ul>
            </section>
        </div>
    )
}

export default Testes