const express = require('express');
const data = require("../Database/database.json")
const caixa = require("../Database/caixa.json")
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
    //console.log(req.body.numero)
    if (req.body.carrinho.length == 0) {
        res.send(false)
    } else {
        if (req.body.tipo == "cartao" && !verify(req.body.numero, req.body.pin)) {
            res.send(false)
        } else {
            caixa["compras"].push({
                "tipo": req.body.tipo,
                "total": req.body.total,
                "carrinho": req.body.carrinho
            })
            fs.writeFileSync('./src/Database/caixa.json', JSON.stringify(caixa));
            res.send(true)
        }
    }
});

app.post('/close', function (req, res) {
    res.send(caixa)
});

app.post('/init', function (req, res) {
    caixa["compras"] = []
    fs.writeFileSync('./src/Database/caixa.json', JSON.stringify(caixa));
    res.send(getFormattedDate())
});

function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    return str;
}

function verify(numero, pin) {
    console.log(numero);
    if (numero.length !== 16 || pin.length !== 3) {
        return false
    }
    return true;
}

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);