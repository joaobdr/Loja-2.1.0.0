import React from 'react'
import style from './DetalheProduto.module.css'
import { useNavigate } from 'react-router-dom';

const DetalheProduto = ({link, content, carrinho, setCarrinho, usuario}) => {
    const navigate = useNavigate();
    const [load, setLoad] = React.useState(false)
    const [msgCarrinho, setMsgCarrinho] = React.useState(false)
    
    const formatado = (+content.preco).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    
    const colocarNoCarrinho = async e => {
        e.preventDefault();
        setLoad(true)       

        // Primeiro, montar o novo carrinho manualmente
        const novoCarrinho = carrinho.some(item => item.codigo === content.codigo)
            ? carrinho.map(item =>
                item.codigo === content.codigo
                    ? { ...item, qtd: item.qtd + 1 }
                    : item)
            : [...carrinho, { codigo: content.codigo, qtd: 1 }];
            

        // Atualiza estado e localStorage
        setCarrinho(novoCarrinho);

        // Agora sim enviar para o servidor
        if (usuario) {
            const token = localStorage.token || null;

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token,
                    user: usuario,
                    carrinho: novoCarrinho   // <-- AGORA É O VALOR CORRETO
                })
            };

            try {                
                const POST = await fetch(link + '/api/loja/carrinho/atualizar', options);
                const RESP = await POST.json();
                
                if(RESP.status) {
                    setMsgCarrinho(true)
                    setTimeout(() => {setMsgCarrinho(false)}, 2000);
                    if(e.target.innerText == 'Comprar') navigate('/carrinho')
                }
                setLoad(false)       

            } catch (error) {
                setLoad(false)       
                console.error("Erro ao atualizar carrinho no servidor:", error);
            }
        }
        else{
            setMsgCarrinho(true)
            setLoad(false)
            setTimeout(() => {setMsgCarrinho(false)}, 2000);
            localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
        }
    };
    

    return (
        <div className={style.div_pai_conteudo}>
            {msgCarrinho && <div className={style.produto_adcionado}>Produto adcionado no carrinho</div>}
            <div className={style.div_fotos_do_produto}>
                <figure className={style.foto_em_destaque}>
                    <img src={link + content.fotos[0]} alt="" />
                </figure>
                
                <ul className={style.ul_miniatura_da_imagens}>
                    {content.fotos.map((x, y) => <li key={y}><img src={link + x} alt="" /></li>)}
                </ul>
            </div>



            <div className={style.div_detalhes_do_produto}> 
                <div className={style.nome_e_estoque}>
                    <h2 className={style.titulo}>{content.produto}</h2>
                    <p className={content.estoque <= 0 ? style.sem_estoque : {}}>{content.estoque <= 0 ? 'não ' : ''}Disponível{content.estoque ? <span>({content.estoque})</span> : ''}</p>
                </div>

                <p className={style.paragrafo_de_descricao}>{content.descricao}</p>

                <div className={style.preco_e_btn}>
                    <div className={style.preco}>
                        <div className={style.p_preco}>
                            <p>{formatado.split(',')[0]}<small>{formatado.split(',')[1]}</small></p>
                        </div>
                        {/* <div className={style.estoque}></div> */}
                    </div>

                    <div className={style.btn_acoes}>
                        <button onClick={colocarNoCarrinho} disabled={load} style={load ? {opacity: '.5'} : {}}>Comprar</button>
                        <button onClick={colocarNoCarrinho} disabled={load} style={load ? {opacity: '.5'} : {}}>Colocar no carrinho</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetalheProduto