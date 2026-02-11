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


router.post('/login', async (req, res) =>{
    try {
        const {username, senha} = req.body
        
        if(!username || !senha) return res.status(400).json({msg: 'Usuário ou senha faltando!', status: false})
            
        const respUserMongo = await db.collection('usuarios-dashboard').findOne({username})
        if(!respUserMongo) return res.status(404).json({msg: 'Usuário não encontrado!', status: false}) 
        if(respUserMongo.senha !== senha) return res.status(404).json({msg: 'Senha invalida', status: false})

        const token = jwt.sign({ username }, secretKey, { expiresIn: "48h" });

        const resp = {
            msg: 'Login ok',
            status: true,
            info_user: {
                username: respUserMongo.username,
                cargo: respUserMongo.cargo
            },
            token
        }
    
        return res.status(200).json(resp)
        
    } catch (err) {
        console.log('erro ===', err);        
        return res.status(500).json({msg: 'Erro interno do servidor', status: false})
    }
})
module.exports = router
