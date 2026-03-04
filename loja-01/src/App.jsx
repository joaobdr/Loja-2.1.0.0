import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './Rotas/Home/Home';
import Header from './Componentes/Header/Header';
import Produtos from './Rotas/Produtos/Produtos';
import Produto from './Rotas/Produto/Produto';
import Footer from './Componentes/Footer/Footer/Footer';
import Login from './Rotas/Login/Login';
import MeuCarrinho from './Rotas/MeuCarrinho/MeuCarrinho';
import Checkout from './Rotas/Checkout/Checkout';
import Pedidos from './Rotas/Pedidos/Pedidos';
import Testes from './Rotas/Testes/Testes';


const link = 'http://localhost:3006'

function App() {
  const ts = localStorage.tema ? JSON.parse(localStorage.tema).tema : true;
  const local = localStorage.token ? localStorage.token : null;
  const [tema, setTema] = React.useState(ts)
  const [carrinho, setCarrinho] = React.useState([])
  const [usuario, setUsuario] = React.useState(null)
  
const verificarToken = async () => { 
  if (!local) {
    localStorage.removeItem("token");
    setUsuario(false);
    return false;
  }

  try {
    const response = await fetch(`${link}/api/loja/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: local }),
    });

    const RESP = await response.json();
    
    if (RESP.status) {
      setUsuario(RESP.user);
      
      if(RESP.user.carrinho) {
        setCarrinho(RESP.user.carrinho)
      }
      
      return RESP.user;
    } else {
      setUsuario(false);
      setCarrinho([]);
      localStorage.removeItem("token");
      return false;
    }

  } catch (error) {
    localStorage.removeItem("token");
    setUsuario(false);
    return false;
  }
};


  const verificarCarrinho = async () =>{
    const localCarrinho = localStorage.carrinho ? JSON.parse(localStorage.carrinho) : false

    if(!localCarrinho) return
    setCarrinho(localCarrinho)
  }
  
  React.useEffect(() => {
    document.documentElement.setAttribute('data-tema', tema ? 'escuro' : 'claro');
    localStorage.setItem("tema", JSON.stringify({tema}));
  }, [tema]);

  React.useEffect(() => {
    const init = async () => {
      const user = await verificarToken();

      if (!user) {
        // só pega carrinho local se não estiver logado
        verificarCarrinho();
      }
    };

    init();
  }, []);
  
  return (
      <BrowserRouter>
        <Header tema={tema} setTema={setTema} usuario={usuario} carrinho={carrinho} setUsuario={setUsuario}/>
        <Routes>
          <Route path="/" element={<Home link={link}/>}/>
          <Route path="/login" element={<Login link={link} setUsuario={setUsuario} carrinho={carrinho} setCarrinho={setCarrinho}/>}/>
          <Route path="/carrinho" element={<MeuCarrinho carrinho={carrinho} link={link} usuario={usuario} setCarrinho={setCarrinho}/>}/>
          <Route path="/checkout" element={<Checkout carrinho={carrinho} link={link} usuario={usuario} setUsuario={setUsuario} setCarrinho={setCarrinho}/>}/>
          <Route path="/todos-produtos" element={<Produtos link={link}/>}/>
          <Route path="/produto/:codigo" element={<Produto link={link} usuario={usuario} carrinho={carrinho} setCarrinho={setCarrinho}/>}/>
          <Route path="/meus-pedidos" element={<Pedidos link={link}/>}/>
          {/* <Route path="/testes" element={<Testes link={link}/>}/> */}
          <Route path="/*" element={<Home link={link}/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
  )
}

export default App
