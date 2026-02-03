const express = require('express')
const {connectToDatabase, getDB} = require('../config/db')


// ***************************     CONFIGs     ***************************
const router = express.Router()
let db
connectToDatabase().then(() => db = getDB())


// ***************************     ROTA     ***************************


const ts = async (req, res) =>{
    const respMongo = await db.collection('users').find({}).toArray()

    return res.status(200).json({msg: 'testando a API', users: respMongo})
}






router.get('', ts)
module.exports = router
