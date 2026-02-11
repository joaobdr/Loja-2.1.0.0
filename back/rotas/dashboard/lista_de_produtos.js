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


router.get('/produtos/lista', async (req, res) =>{
    try {
        const {token, username} = req.headers      
        const respToken = await verificarToken(token, username)
        
        if(!respToken.status) return res.status(400).json(respToken)

        const respMongo = await db.collection('produtos').find({}).toArray()

        const ts = e =>{ 
            const cargos = ['admin', 'root'] //Cargos com permissao para ver o custo
            console.log('-------------------------------------------------');            
            console.log(cargos.includes(respToken.info_user.cargo));
            console.log(respToken.info_user.cargo);
            console.log(e);
            console.log('-------------------------------------------------');

            
            if(cargos.includes(respToken.info_user.cargo)) return e.custo
            else return undefined
        }
    
        
        
        return res.status(200).json({msg: "lista simples de produtos", status: true, produtos: [...respMongo.map(x => ({...x, _id: undefined, custo: ts(x)}))]})        
    } catch (err) {
        console.log('erro ===', err);        
        return res.status(500).json({msg: 'Erro interno do servidor', status: false})
    }
})
module.exports = router
