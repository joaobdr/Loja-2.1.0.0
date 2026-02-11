const express = require('express')
const {connectToDatabase, getDB} = require('../../config/db')
const jwt = require("jsonwebtoken");
const { verificarToken } = require('../../componentes/verificarToken');
const fs = require('fs')
const path = require('path')
const {v4: uuidv4} = require('uuid')
const multer = require('multer')

// ***************************     CONFIGs     ***************************
const router = express.Router()
let db
connectToDatabase().then(() => db = getDB())
const secretKey = process.env.secretKey

// ***************************     ROTA     ***************************


router.get('/token', async (req, res) =>{
    try {
        const {token, username} = req.headers
        const verifToken = await verificarToken(token, username)
        return res.status(200).json(verifToken)
    } catch (err) {
        console.log('erro ===', err);        
        return res.status(500).json({msg: 'Erro interno do servidor', status: false})
    }
})
module.exports = router
