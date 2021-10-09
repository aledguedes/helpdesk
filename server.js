const exp = require('constants')
const express = require('express')
const app  = express()

const PORT = process.env.PORT || 8080

app.use(express.static(__dirname + '/dist/help'))

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/help/index.html')
})

app.listen(PORT, () => {
    console.log("Estamos na porta "+PORT)
})