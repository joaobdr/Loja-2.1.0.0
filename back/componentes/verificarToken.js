const express = require("express");
const router = express.Router();
const { connectToDatabase, getDB } = require("../config/db");
const jwt = require("jsonwebtoken");



const secretKey = process.env.secretKey;
let db;
connectToDatabase().then(() => {  db = getDB();});



const verificarToken = async (token, username, colecao) =>{
    if (!token || !username) return {msg: "Usuário ou token faltando", status: false}
    
    try {
        const decoded = jwt.verify(token, secretKey); 
        
        if(decoded.username !== username) return {msg: 'Token não correspondente ao usuário', status: false}        

        const respMongo = await db.collection(colecao || 'usuarios-dashboard').findOne({username: decoded.username});
        
        if (!respMongo) return { msg: "Usuário não encontrado", status: false }
        if (respMongo.perfil == 'desabilitado') return { msg: "Perfil desabilitado", status: false }
        
        return {msg: 'token valido', status: true, info_user: {username, cargo: respMongo.cargo}}
        
    } catch (err) {
        return {msg: 'token expirado!', status: false}
        
    }
    
}


module.exports = { verificarToken };