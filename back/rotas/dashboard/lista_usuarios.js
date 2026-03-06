const express = require('express')
const {connectToDatabase, getDB} = require('../../config/db')
const jwt = require("jsonwebtoken");
const { verificarToken } = require('../../componentes/verificarToken');

// ***************************     CONFIGs     ***************************
const router = express.Router()
let db
connectToDatabase().then(() => db = getDB())
const secretKey = process.env.secretKey


// ***************************     ROTA     ***************************

const cargosPermitidos = new Set(['adm', 'admin', 'root'])

router.get('/usuarios/lista', async (req, res) =>{
    try {
        const {token, username} = req.headers  
        
        const respToken = await verificarToken(token, username)        
        if(!respToken.status) return res.status(404).json(respToken)

        
        const respMongo = await db.collection('usuarios-dashboard').find().toArray()


        return res.status(200).json({msg: "lista simples de usuarios", status: true, usuarios: [...respMongo.map(x => ({...x, _id: undefined, senha: undefined}))]})        
    } catch (err) {
        console.log('erro ===', err);        
        return res.status(500).json({msg: 'Erro interno do servidor', status: false})
    }
})
module.exports = router
