const express = require('express');
const data = require("./src/database.json")
const caixa = require("./src/caixa.json")
var cors = require('cors');
var bodyParser = require('body-parser')
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());

app.post('/getProduto', function (req, res) {
    res.send(
        data[req.body.id]
    )
});

app.post('/pagar', function (req, res) {
    if (req.body.carrinho.length == 0) {
        res.send(false)
    } else {
        if (req.body.tipo == "cartao" && !verify()) {
            res.send(false)
        } else {
            caixa["compras"].push({
                "tipo": req.body.tipo,
                "total": req.body.total,
                "carrinho": req.body.carrinho
            })
            fs.writeFileSync('./src/caixa.json', JSON.stringify(caixa));
            res.send(true)
        }
    }
});

app.post('/close', function (req, res) {
    res.send(caixa)
});

function verify() {
    var x = Math.random() * (100 - 0) + 0;
    if (x < 10) {
        return false
    }
    return true;
}

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);