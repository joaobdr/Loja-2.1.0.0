const express = require('express')
const cors = require('cors')
require('dotenv').config();



// ***************************     CONFIGs     ***************************

const app = express()
const port = process.env.port || 3010

app.use(express.json({ limit: "10mb" }))
app.use("/assets", express.static("assets"));
// app.use(cors({origin: process.env.origin || '*'}))
app.use(cors(
    {allowedHeaders: ['Content-Type', 'token', 'username_adm']}
))

// ***************************     IMPORTS ROTAS     ***************************


const testes = require('./rotas/testes');
const cadastrar_produto = require('./rotas/dashboard/cadastrar');
const token = require('./rotas/dashboard/token');
const login = require('./rotas/dashboard/login');
const lista_de_produtos = require('./rotas/dashboard/lista_de_produtos');
const atualizar_produto = require('./rotas/dashboard/atualizarProduto');
const destacar_produto = require('./rotas/dashboard/destacar_produto');
const listar_cupons = require('./rotas/dashboard/enviar_cupons_GET');
const criar_cupom = require('./rotas/dashboard/criar_cupom')
const atualizar_cupom = require('./rotas/dashboard/atualizar_cupom')
const lista_de_usuarios = require('./rotas/dashboard/lista_usuarios')
const cadastrar_usuarios = require('./rotas/dashboard/cadastrar_usuario')
const atualizar_usuario = require('./rotas/dashboard/atualizar_usuario')


// ***************************     ROTAS     ***************************


app.use('/api', login)
app.use('/api', cadastrar_produto)
app.use('/api', testes)
app.use('/api', token)
app.use('/api', lista_de_produtos)
app.use('/api', atualizar_produto)
app.use('/api', destacar_produto)
app.use('/api', listar_cupons)
app.use('/api', criar_cupom)
app.use('/api', atualizar_cupom)
app.use('/api', lista_de_usuarios)
app.use('/api', cadastrar_usuarios)
app.use('/api', atualizar_usuario)

app.get('/', (_, res) => res.status(200).json({msg: 'teste de rota', status: true, ts: true}))




// ***************************     OUTROs     ***************************
app.listen(port, ()=>{
    console.log('servidor rodando na porta: ', port);
    console.log(`http://localhost:${port}`);
    
})