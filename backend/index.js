const express = require('express')
const db = require('./db/queries')
const app = express()
app.use(express.json());

app.use(express.static('public'))

app.post('/api/getInformation', db.getInformation);

app.listen('3000',function(){
         console.log ('Сервер запущен на http://localhost:3000')
})