const express = require('express')
const {connectToDatabase, getDB} = require('../../config/db')
const { verificarToken } = require('../../componentes/verificarToken');

// ***************************     CONFIGs     ***************************
const router = express.Router()
let db
connectToDatabase().then(() => db = getDB())
const secretKey = process.env.secretKey


const cargosPermitidos = new Set([ 'administrador', 'fundador', 'root'])

// ***************************     ROTA     ***************************
router.post('/cupom/atualizar', async (req, res) =>{
    try {
        const {cupom, descricao, ativo,  validade, desconto, tipo, limit, valor_minimo, valor_maximo, primeira_compra} = req.body
        const {token, username} = req.headers 

        const verifToken = await verificarToken(token, username)
        if(!verifToken.status) return res.status(404).json(verifToken)

        if (!cargosPermitidos.has(verifToken.info_user.perfil)) return res.status(403).json({ msg: 'Usuário sem permissão', status: false })
        if(!cupom || !descricao || !desconto || !tipo) return res.status(400).json({msg: 'Não há informações suficientes para criar cupom', status: false})
        if (isNaN(Number(desconto))) return res.status(400).json({msg: 'Desconto inválido',status: false})

        
        const obj ={
            cupom,
            descricao,
            ativo,
            dataFim: validade ? new Date(validade) : null,
            desconto: {
                tipo, 
                valor: Number(desconto)
            },
            limiteGeral: Number(limit),
            restricoes:{
                apenasPrimeiraCompra: primeira_compra,
                valorMinimoDesconto: valor_minimo,
                valorMaximoDesconto: valor_maximo,
                
            },
            atualizadoEm: new Date(),
        }

        const atualizarMongo = await db.collection('cupons').updateOne({cupom},{ $set: obj})

        if (atualizarMongo.matchedCount === 0) {
            return res.status(404).json({
                msg: 'Cupom não encontrado',
                status: false
            })
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
        
        return res.status(200).json({msg: 'cupom atualizado com sucesso!', status: true, lista})
        
    } catch (err) {
        console.log('erro ===', err);        
        return res.status(500).json({msg: 'Erro interno do servidor', status: false})
    }
})
module.exports = router
