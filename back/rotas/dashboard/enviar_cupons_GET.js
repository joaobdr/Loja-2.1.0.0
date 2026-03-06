const express = require('express')
const {connectToDatabase, getDB} = require('../../config/db')
const { verificarToken } = require('../../componentes/verificarToken');
// const {v4: uuidv4} = require('uuid')
// const isEqual = require("lodash/isEqual");

// ***************************     CONFIGs     ***************************
const router = express.Router()
let db
connectToDatabase().then(() => db = getDB())
const secretKey = process.env.secretKey

// ***************************     ROTA     ***************************


router.get('/cupons/lista', async (req, res) =>{
    try {
        const {token, username} = req.headers
        const verifToken = await verificarToken(token, username)
        
        if(!verifToken.status){
            return res.status(401).json(verifToken)
        }

        const cargosPermitidos = new Set(['adm', 'admin', 'root'])

        if (!cargosPermitidos.has(verifToken.info_user.perfil)) {
            return res.status(403).json({ msg: 'Usuário sem permissão', status: false })
        }
        
        const listaMongo = await db.collection('cupons').find().toArray()
        

        //Verificar se o cupom ainda é valido
        const lista = listaMongo.map(x =>{
            const agora = new Date()
            let ativo = x.ativo;
            const dataFim = new Date(x.dataFim)
            
            
            if(x.dataFim) if((dataFim < agora)) ativo = false
            if(x.limiteGeral) if((x.limiteGeral <= x.usados.length)) ativo = false


            return ({...x, ativo})
        })
        
        

        return res.status(200).json({status: true, msg: 'Lista de cupons', lista})
    } catch (err) {
        console.log('erro ===', err);        
        return res.status(500).json({msg: 'Erro interno do servidor', status: false})
    }
})
module.exports = router
