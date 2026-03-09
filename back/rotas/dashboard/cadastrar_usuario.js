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

const cargosPermitidos = new Set([ 'administrador', 'root', 'fundador'])
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
        valor: 2
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

router.post('/usuarios/cadastrar', async (req, res) =>{
    try {
        const headers = req.headers      
        const {username, senha, repetirSenha, nome, perfil} = req.body
        
        
        if(!username || !senha || !repetirSenha || !nome || !perfil) return res.status(400).json({msg: 'Não há informações suficientes'})

        if(senha !== repetirSenha)return res.status(400).json({msg: 'As senhas não coincidem',status: false})

        const respToken = await verificarToken(headers.token, headers.username)
        if(!respToken.status) return res.status(404).json(respToken)        

        //Cargo do usuario que vai cadastrar
        const cargo = respToken.info_user.perfil
            
        if(!cargosPermitidos.has(cargo)) return res.status(401).json({msg: 'Você não tem permissão para cadastrar usuários', status: false})
        
        const verificarSeUsuarioExiste = await db.collection('usuarios-dashboard').findOne({username})
        if(verificarSeUsuarioExiste) return res.status(400).json({msg: 'Usuário já cadastrado', status: false})

        const verificarHierarquia =  hierarquia.find(x => x.cargo === cargo)
        const verificarHierarquiaCadastro =  hierarquia.find(x => x.cargo === perfil)
                
        
        if (!verificarHierarquia || !verificarHierarquiaCadastro) return res.status(400).json({ msg: 'Perfil inválido', status: false })
        
        //Atualmente não pode cadastrar um perfil igual ao do solicitante. Caso queira liberar basta tirar o '=' do '<='
        if(verificarHierarquia.valor <= verificarHierarquiaCadastro.valor) return res.status(400).json({msg: 'Você não pode criar um perfil igual ou superior ao seu', status: false})

        
        const obj = {
            username, 
            nome,
            senha, //Futuramente trocar para uma senha com hash
            perfil, 
            criadoEm: new Date()
        }
        
        const criarUsuarioMongo = await db.collection('usuarios-dashboard').insertOne(obj)            


        return res.status(201).json({msg: "Usuário cadastrado com sucesso!!", status: true})        
    } catch (err) {
        console.log('erro ===', err);        
        return res.status(500).json({msg: 'Erro interno do servidor', status: false})
    }
})
module.exports = router
