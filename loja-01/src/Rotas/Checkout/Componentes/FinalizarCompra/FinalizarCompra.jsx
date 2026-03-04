import React from 'react';
import style from './FinalizarCompra.module.css';
import Cartao from './Cartao/Cartao';
import Resumo from './Resumo/Resumo';
import RetirarNaLoja from './RetirarNaLoja/RetirarNaLoja';
import FormEndereco from './FormEndereco/FormEndereco';


const FinalizarCompra =  ({ carrinho, link, setCarrinho}) => {
  const codigos = carrinho.map(item => item.codigo).join(',');
  const [produtos, setProdutos] = React.useState([])
  const [janela, setJanela] = React.useState(false)
  const [formulario, setFormulario] = React.useState(false)


  const [infoEntrega, setInfoEntrega] = React.useState({})
  const total = produtos.reduce((acc, item) => acc + item.preco * item.qtd,0);
  const aleatorio = Math.floor(Math.random() * (10000 - 0 + 1)) + 0
    
  React.useEffect(() => {
    const carregarProdutos = async () => {
      if (!carrinho || carrinho.length === 0) return;
  
      const requisicoes = carrinho.map(x =>
        fetch(`${link}/api/loja/produtos/detalhe-do-produto/?codigo=${x.codigo}`)
          .then(res => res.json())
          .then(data => ({ ...data.produto, qtd: x.qtd }))
      );
  
      const resultado = await Promise.all(requisicoes);
      setProdutos(resultado);
    };
  
    carregarProdutos();
  }, [codigos]);

  
  
  
  return (
    <div className={style.div_form}>
      <div className={style.formularios_de_pagamentos}>
        <h2 className={style.titulo}>Formas de pagamentos</h2>

        <div className={style.div_entrega}>
          <FormEndereco
            link={link}
            infoEntrega={infoEntrega}
            setInfoEntrega={setInfoEntrega}
            setJanela={setJanela}
            janela={janela}
            setFormulario={setFormulario}

            />
          {/* <RetirarNaLoja  tipo={tipo} setTipo={setTipo}/> */}
        </div>

        <ul className={style.lista_de_pagamentos}>
          <li>
            <h4 className={style.titulo} onClick={() => formulario ? setJanela(!janela) : alert('Preencha primeiro o formulario da entrega')}>Cartão</h4>
            <div className={style.div_pai}
                style={{
                  maxHeight: janela ? '1000px' : '0',
                  opacity: janela ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.5s ease' }}>
              {janela && (
                <Cartao 
                  janela={janela} 
                  link={link} 
                  setCarrinho={setCarrinho} 
                  carrinho={carrinho} 
                  total={total} 
                  infoEntrega={infoEntrega}
                />)}
              </div>
            {/* {(carrinho.length != 0 ? (produtos.length >= carrinho.length) : false)  && (<Cartao key={aleatorio} janela={janela} link={link} setCarrinho={setCarrinho} carrinho={carrinho} total={total} infoEntrega={infoEntrega}/>)} */}
          </li>
          {/* <li>
            <h4 className={style.titulo}>PIX</h4>
          </li> */}
        </ul>
      </div>

      <div className={style.resumo_de_valore}>
        <h2 className={style.titulo}>Resumo</h2>
        
        <Resumo produtos={produtos}/>
        <button
          className={style.btn_pagar}
          type="submit"
          form="form-checkout"
        >
        Pagar
        </button>
      </div>
    </div>
  );
};

export default FinalizarCompra;
