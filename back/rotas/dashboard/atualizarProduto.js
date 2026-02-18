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
router.post('/produto/atualizar', (req, res, next) => {

// ***************************     Verificações com multer     ***************************
    upload.fields([{name: 'imagens', maxCount: 10}, {name: 'imagemFundo', maxCount: 1}])(req, res, err => {
        if(err instanceof multer.MulterError) return res.status(400).json({ msg: err.message, status: false })
        if(err) return res.status(400).json({ msg: err.message, status: false })
        next()
    })
}, 
// ***************************     tratamento do request     ***************************
async (req, res) =>{
    try {
        const { username, codigo, nome, preco, custo, descricao, estoque, categoria, imgsAlteradas} = req.body
        const imgs = JSON.parse(imgsAlteradas) || []
        const imagens = req.files?.imagens || []
        const fundo = req.files.imagemFundo ? req.files.imagemFundo[0] : null;
        const token = req.headers.token?.split(' ')[1]


        const verifToken = await verificarToken(token, username)
        if(!verifToken.status) {
            removerArquvios(imagens, fundo)
            return res.status(401).json({verifToken})
        }
        const cargos = ['root', 'admin', 'adm']
        
        if(!cargos.includes(verifToken.info_user.cargo)){
            await removerArquvios(imagens, fundo)
            return res.status(400).json({msg: 'Usuário sem permissão para cadastrar produto!', status: false})
        }

        let imagem_fundo = undefined;
        if(fundo){
            imagem_fundo = '/' + fundo.destination + fundo.filename
        }
        

        //cria uma array com o cominho das imagens
        const imgsRecebidas = imagens.map(x => '/' + x.destination +  x.filename);
        const tes = [...imgsRecebidas, ...imgs];

        //Define undefined caso não venha nenhum numero do front
        const est = estoque !== undefined ? Number(estoque) : undefined;
        const pre = preco !== undefined ? Number(preco) : undefined;
        const cus = custo !== undefined ? Number(custo) : undefined;
        const teste = { nome, preco: pre, custo: cus, descricao, estoque:  est, categoria, imagens: tes, imagem_fundo} 

        //Remove do objeto todos os itens q nao foram alterados
        const novo = Object.fromEntries( Object.entries(teste).filter(([_, v]) => v !== undefined));

        const atualizarMongo = await db.collection('produtos').updateOne({ codigo },{ $set: novo })
        const lista = await db.collection('produtos').find({}).toArray()

        return res.status(200).json({msg: 'Produto atualizado com sucesso!!', status: true, lista})
    } catch (err) {
        console.log('erro ===', err);        
        return res.status(500).json({msg: 'Erro interno do servidor', status: false})
    }
})
module.exports = router
