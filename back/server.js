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
const login = require('./rotas/dashboard/login');


// ***************************     ROTAS     ***************************


app.use('/api', login)
app.use('/api', testes)
app.get('/', (_, res) => res.status(200).json({msg: 'teste de rota'}))




// ***************************     OUTROs     ***************************
app.listen(port, ()=>{
    console.log('servidor rodando na porta: ', port);
    console.log(`http://localhost:${port}`);
    
})