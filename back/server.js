const express = require('express')
const cors = require('cors')
require('dotenv').config();



// ***************************     CONFIGs     ***************************

const app = express()
const port = process.env.port || 3000 

app.use(express.json({ limit: "10mb" }))
app.use("/assets", express.static("assets"));
app.use(cors())

// ***************************     IMPORTS ROTAS     ***************************


const testes = require('./rotas/testes');
const cadastrar_produto = require('./rotas/dashboard/cadastrar');
const token = require('./rotas/dashboard/token');
const login = require('./rotas/dashboard/login');
const lista_de_produtos = require('./rotas/dashboard/lista_de_produtos');
const atualizar_produto = require('./rotas/dashboard/atualizarProduto');
const destacar_produto = require('./rotas/dashboard/destacar_produto');


// ***************************     ROTAS     ***************************


app.use('/api', login)
app.use('/api', cadastrar_produto)
app.use('/api', testes)
app.use('/api', token)
app.use('/api', lista_de_produtos)
app.use('/api', atualizar_produto)
app.use('/api', destacar_produto)
app.get('/', (_, res) => res.status(200).json({msg: 'teste de rota'}))




// ***************************     OUTROs     ***************************
app.listen(port, ()=>{
    console.log('servidor rodando na porta: ', port);
    console.log(`http://localhost:${port}`);
    
})