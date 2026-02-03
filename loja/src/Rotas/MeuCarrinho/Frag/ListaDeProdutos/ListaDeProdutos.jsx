import React from 'react';
import style from './ListaDeProdutos.module.css';

import Plus from '/assets/imgs/site/plus.svg?react';
import Less from '/assets/imgs/site/less.svg?react';
import Trash from '/assets/imgs/site/trash.svg?react';

const ListaDeProdutos = ({ link, info, formatar, carrinho, setCarrinho, usuario }) => {
  const { produto, descricao, fotos, preco, qtd, codigo } = info;
  // Estado interno da quantidade
  const [quant, setQuant] = React.useState(qtd ?? 1);

  // Garante que só atualiza se o valor realmente for diferente
  React.useEffect(() => {
    if (typeof qtd === "number" && qtd !== quant) {
      setQuant(qtd);
    }
  }, [qtd, quant]);

  React.useEffect(()=>{
    document.title = 'Meu carrinho'
  },[])

  /* ---------------------------------------------------------------------
    Função segura para salvar carrinho SEM loops e sem sobrescrever à toa
  ---------------------------------------------------------------------- */
  const salvarCarrinho = async (lista) => {

    // Atualiza estado local sem criar loops
    setCarrinho(prev => {
      const iguaiss = JSON.stringify(prev) === JSON.stringify(lista);
      return iguaiss ? prev : lista;
    });

    // Atualização local no visitante
    if (!usuario) {
      localStorage.setItem('carrinho', JSON.stringify(lista));
      return;
    }

    // Usuário logado → sincroniza com backend
    const token = localStorage.token || null;

    try {
      const POST = await fetch(`${link}/api/loja/carrinho/atualizar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          carrinho: lista.map(x => ({ codigo: x.codigo, qtd: x.qtd }))
        })
      });

      const RESP = await POST.json();

      if (RESP.status) {
        localStorage.setItem('carrinho', JSON.stringify(lista));
      }

    } catch (error) {
      console.error("Erro ao atualizar carrinho:", error);
    }
  };


  /* ----------------------------------------------------------
    Atualiza quantidade de forma segura e sem re-renders excessivos
  ----------------------------------------------------------- */
  const atualizarQuantidade = (novoValor) => {
    if (novoValor < 1) return;

    setQuant(novoValor);

    const novaLista = carrinho.map(item =>
      item.codigo === codigo ? { ...item, qtd: novoValor } : item
    );

    salvarCarrinho(novaLista);
  };

  const handleMore = () => atualizarQuantidade(quant + 1);
  const handleLess = () => atualizarQuantidade(quant - 1);

  const handleRemove = () => {
    const novaLista = carrinho.filter(x => x.codigo !== codigo);
    salvarCarrinho(novaLista);
  };


  /* ------------------------------
    Render
  ------------------------------- */
  return (
    <li className={style.lista_carrinho}>

      <figure>
        <img 
          src={`${link}${fotos?.[0]}`}
          alt={produto}
        />
      </figure>

      <div className={style.textos}>
        <h2 className={style.nome}>{produto}</h2>
        <p>{descricao}</p>
      </div>

      <div className={style.quantidade}>
        {quant === 1 ? (
          <Trash onClick={handleRemove} />
        ) : (
          <Less onClick={handleLess} />
        )}
        <span>{quant}</span>
        <Plus onClick={handleMore} />
      </div>

      <div className={style.preco}>
        <p className={style.valor_un}>
          <span>{quant} x </span>
          {formatar(preco)}
        </p>
        <p className={style.preco_total}>
          {formatar(quant * preco)}
        </p>
      </div>

    </li>
  );
};

export default ListaDeProdutos;
