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


router.post('/produto/destacar', async (req, res) =>{
    try {
        const {username, token, codigo, action} = req.body

        const verifToken = await verificarToken(token, username)
        if(!verifToken.status) return res.status(404).json(verifToken)

        
        const mongoCollection = db.collection('produtos')

        const qtdDestacados  = await mongoCollection.countDocuments({destaque: true});
        if(action) if(qtdDestacados >= 3) return res.status(400).json({msg: "Limite de produtos destacados atingido", status: false})
        if(!action) if(qtdDestacados <= 1) return res.status(400).json({msg: "Precisa pelo menos ter um produto em destaque", status: false})

        
        const destacarProduto = await mongoCollection.updateOne({codigo}, {$set:{destaque: action}})
        const produtos = await mongoCollection.find({}).toArray()       
        

        return res.status(200).json({msg: 'produto atualizado', status: true, produtos})
        
    } catch (err) {
        console.log('erro ===', err);        
        return res.status(500).json({msg: 'Erro interno do servidor', status: false})
    }
})
module.exports = router
