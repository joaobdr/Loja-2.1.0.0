const express = require('express')
const {connectToDatabase, getDB} = require('../../config/db')
const { verificarToken } = require('../../componentes/verificarToken');

// ***************************     CONFIGs     ***************************
const router = express.Router()
let db
connectToDatabase().then(() => db = getDB())
const secretKey = process.env.secretKey


const cargosPermitidos = new Set([ 'administrador', 'fundador', 'root'])
const hierarquia = [
    {
        cargo: 'desabilitado',
        valor: 1
    },
    {
        cargo: 'padrao',
        valor: 2
    },
    {
        cargo: 'administrador',
        valor: 3
    },
    {
        cargo: 'fundador',
        valor: 10
    },
    {
        cargo: 'root',
        valor: 100
    }
]

// ***************************     ROTA     ***************************
router.post('/usuario/atualizar', async (req, res) =>{
    try {
        const {token, username_adm} = req.headers         
        const {perfil, senha, repetirSenha, nome, username} = req.body     

        const verifToken = await verificarToken(token, username_adm)
        if(!verifToken.status) return res.status(404).json(verifToken, {token, username_adm})
        if (!cargosPermitidos.has(verifToken.info_user.perfil)) return res.status(403).json({ msg: 'Usuário sem permissão', status: false })
        
        let atualizacao = {nome}
        
        if(senha){
            if(senha !== repetirSenha) return res.status(400).json({status: false, msg: 'As senhas não são iguais'}) 
            atualizacao = {...atualizacao, senha}
        }

        const user_mongo = await db.collection('usuarios-dashboard').findOne({username})  

        const perfil_adm = hierarquia.find(x => x.cargo === verifToken.info_user.perfil).valor
        const perfil_cliente = hierarquia.find(x => x.cargo === user_mongo.perfil).valor
        const perfil_alterar = hierarquia.find(x => x.cargo === perfil)
        
        if(!perfil_alterar) return res.status(400).json({msg: 'Perfil invalido', status: false})
        if(perfil_adm <= perfil_cliente) return res.status(400).json({status: false, msg: 'Você não pode alterar um perfil igual ou superior ao seu!'}) 
        if(perfil_adm <= perfil_alterar.valor) return res.status(400).json({status: false, msg: 'Você não pode alterar para um perfil supérior ao seu!'}) 

        atualizacao = {
            ...atualizacao,
            perfil
        }

        const att_user_mongo = await db.collection('usuarios-dashboard').updateOne({username}, {$set: atualizacao})
        
        
        return res.status(200).json({msg: 'Usuário atualizado com sucesso!', status: true})
        
    } catch (err) {
        console.log('erro ===', err);        
        return res.status(500).json({msg: 'Erro interno do servidor', status: false})
    }
})
module.exports = router
