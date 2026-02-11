const express = require('express')
const {connectToDatabase, getDB} = require('../../config/db')
const jwt = require("jsonwebtoken");
const { verificarToken } = require('../../componentes/verificarToken');
const fs = require('fs')
const path = require('path')
const {v4: uuidv4} = require('uuid')
const multer = require('multer');

// ***************************     CONFIGs     ***************************
const router = express.Router()
let db
connectToDatabase().then(() => db = getDB())
const secretKey = process.env.secretKey

// ***************************     multer     ***************************
const fileFilter = (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (allowed.includes(file.mimetype)) cb(null, true)
    else cb(new Error('Tipo de arquivo não permitido'), false)
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'assets/testes/')
    },
    filename: function (req, file, cb){
        
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage, limits: {fileSize: 15 * 1024 * 1024}, fileFilter})

// ***************************     funções     ***************************
const removerArquvios = async (imagens, fundo) =>{
    try{
        if(imagens[0]) for(const i of imagens) await fs.promises.unlink(i.path)
        if(fundo) await fs.promises.unlink(fundo.path)
        return 
    }catch{}
}

// ***************************     ROTA     ***************************
router.post('/cadastrar', (req, res, next) => {

// ***************************     Verificações com multer     ***************************
    upload.fields([{name: 'imagens', maxCount: 10}, {name: 'fundo', maxCount: 1}])(req, res, err => {
        if(err instanceof multer.MulterError) return res.status(400).json({ msg: err.message, status: false })
        if(err) return res.status(400).json({ msg: err.message, status: false })
        next()
    })
}, 
// ***************************     tratamento do request     ***************************
async (req, res) =>{
    try {
        const { username, codigo, nome, preco, custo, descricao, estoque, categoria} = req.body
        const imagens = req.files?.imagens || []
        const fundo = req.files.fundo ? req.files.fundo[0] : null;
        const token = req.headers.token?.split(' ')[1]


        const verifToken = await verificarToken(token, username)
        if(!verifToken.status) {
            removerArquvios(imagens, fundo)
            return res.status(401).json({verifToken})
        }

        if(!codigo || !nome || !descricao || !imagens[0] || !categoria) {
            removerArquvios(imagens, fundo)
            return res.status(400).json({msg: 'não há informações suficientes para proseguir com o cadastro', status: false})
        }        
        
        const produto = {
            codigo,
            nome,
            preco: Number(preco) || 0,
            custo: Number(custo) || 0,
            imagens: imagens.map(x => '/'+  x.destination + x.filename),
            imagem_fundo: fundo ? '/' + fundo.destination + fundo.filename : '/assets/imgs/default_fundo.jpg' ,
            descricao,
            categoria: categoria.toLowerCase(),
            ativo: false,
            estoque: Math.round(Number(estoque)) || 0,
            destaque: false,
            data_criacao: new Date()
        }
        const verificarProdutoMongo = await db.collection('produtos').findOne({codigo})

        if(!!verificarProdutoMongo){
            removerArquvios(imagens, fundo)
            return res.status(409).json({msg: 'Produto já cadastrado!', status: false})
        }

        const insertMongo = await db.collection('produtos').insertOne(produto)
        
        return res.status(201).json({msg: 'Produto cadastrado com sucesso!!', status: true, produto})
    } catch (err) {
        console.log('erro ===', err);        
        return res.status(500).json({msg: 'Erro interno do servidor', status: false})
    }
})
module.exports = router
