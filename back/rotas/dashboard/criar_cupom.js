const express = require('express')
const {connectToDatabase, getDB} = require('../../config/db')
const { verificarToken } = require('../../componentes/verificarToken');

// ***************************     CONFIGs     ***************************
const router = express.Router()
let db
connectToDatabase().then(() => db = getDB())
const secretKey = process.env.secretKey


const cargosPermitidos = new Set(['administrador', 'fundador', 'root'])
// ***************************     ROTA     ***************************


router.post('/cupom/criar', async (req, res) =>{
    try {
        const {cupom, descricao, validade, desconto, tipo, limit, valor_minimo, valor_maximo, primeira_compra} = req.body
        const {token, username} = req.headers  
        
        // console.log({cupom, descricao, validade, desconto, tipo, limit, valor_minimo, primeira_compra} );
        

        const verifToken = await verificarToken(token, username)
        if(!verifToken.status) return res.status(404).json(verifToken)

        if (!cargosPermitidos.has(verifToken.info_user.perfil)) return res.status(403).json({ msg: 'Usuário sem permissão', status: false })
        if(!cupom || !descricao || !desconto || !tipo) return res.status(400).json({msg: 'Não há informações suficientes para criar cupom', status: false})

        const colecao = await db.collection('cupons')

        const verificarCupom = await colecao.findOne({cupom})
        if(!!verificarCupom) return res.status(400).json({msg: 'Cupom já cadastrado!', status: false})

        const obj ={
            cupom,
            descricao,
            dataFim: validade ? new Date(validade) : null,
            ativo: true,
            desconto: {
                tipo, 
                valor: Number(desconto)
            },
            limiteGeral: Number(limit),
            usados: [],
            restricoes:{
                apenasPrimeiraCompra: primeira_compra,
                valorMinimoDesconto: valor_minimo,
                valorMaximoDesconto: valor_maximo,
                
            },
            atualizadoEm: new Date(),
            criadoEm: new Date(),
            dataInicio: new Date(),
        }

        const criarCupom = await colecao.insertOne(obj)

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
        
        
        return res.status(201).json({msg: 'cupom cadastrado com sucesso!', status: true, lista})
        
    } catch (err) {
        console.log('erro ===', err);        
        return res.status(500).json({msg: 'Erro interno do servidor', status: false})
    }
})
module.exports = router
