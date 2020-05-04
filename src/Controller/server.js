const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());
var modal = require('../Model/modal')

app.post('/getProduto', function (req, res) {
    res.send(
        modal.data.product(req.body.id)
    )
});

app.post('/pagar', function (req, res) {
    if (req.body.carrinho.length == 0) {
        res.send(false)
    } else {
        if (req.body.tipo == "cartao" && !verify(req.body.numero, req.body.pin)) {
            res.send(false)
        } else {
            modal.data.pagar(req.body.tipo, req.body.total, req.body.carrinho)
            res.send(true)
        }
    }
});

app.post('/close', function (req, res) {
    res.send(modal.data.close())
});

app.post('/init', function (req, res) {
    modal.data.init()
    res.send(getFormattedDate())
});

function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    return str;
}

function verify(numero, pin) {
    if (numero.length !== 16 || pin.length !== 3) {
        return false
    }
    return true;
}

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);