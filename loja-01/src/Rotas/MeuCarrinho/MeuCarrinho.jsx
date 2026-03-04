import React from 'react'
import style from './Carrinho.module.css'
import ListaDeProdutos from './Frag/ListaDeProdutos/ListaDeProdutos';
import { Link } from 'react-router-dom';


const Carrinho = ({carrinho, link, usuario, setCarrinho}) => {  
const codigos = carrinho.map(item => item.codigo).join(',');

React.useEffect(() => {
  const carregarProdutos = async () => {
    if (!carrinho || carrinho.length === 0) return;

    const requisicoes = carrinho.map(x =>
      fetch(`${link}/api/loja/produtos/detalhe-do-produto/?codigo=${x.codigo}`)
        .then(res => res.json())
        .then(data => ({ ...data.produto, qtd: x.qtd }))
    );

    const resultado = await Promise.all(requisicoes);
    setCarrinho(resultado);
    localStorage.setItem('produtos', JSON.stringify(resultado));
  };

  carregarProdutos();
}, [codigos]); // ← só roda quando a estrutura do carrinho muda, não qts
  
  const formatar = (e) =>{
    return (+e).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
  }
  

  return (
    <main className={`container ${style.main}`}>
        <section className={style.section_carrinho}> 
          <h1 className={style.titulo}>MEU CARRINHO</h1>

          <div className={style.lista_e_sumario}>
            <ul className={style.ul_carrinho}>
              {carrinho.map((x, y) => <ListaDeProdutos key={y} info={x} link={link} formatar={formatar} carrinho={carrinho} setCarrinho={setCarrinho} usuario={usuario}/>)}
            </ul>
            
            <div className={style.sumario}>
              <h4 className={style.titulo}>Resumo</h4>

              <div className={style.cupom_desconto}>
                <input type="text" placeholder='Cupom'/>
                <button>APLICAR</button>
              </div>

              <div className={style.valores}>
                <p className={style.subtotal_p}>
                  Subtotal: 
                  <span>{formatar(carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0))}</span>
                </p>    
                <p className={style.subtotal_p}>
                Total: 
                <span>{formatar(carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0))}</span>
                </p>
              </div>

              <Link to="/checkout" className={style.btn_comprar}>
                <button>Comprar</button>
              </Link> 
            </div>
          </div>

        </section>
    </main>
  )
}

export default Carrinho