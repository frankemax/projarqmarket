const express = require('express');
const data = require("../Database/database.json")
const caixa = require("../Database/caixa.json")
const fs = require('fs');

var methods = {
    product: function (id) {
        return data[id]
    },
    close: function () {
        return caixa
    },
    init: function () {
        caixa["compras"] = []
        fs.writeFileSync('./src/Database/caixa.json', JSON.stringify(caixa));
    },
    pagar: function (tipo, total, carrinho) {
        caixa["compras"].push({
            "tipo": tipo,
            "total": total,
            "carrinho": carrinho
        })
        fs.writeFileSync('./src/Database/caixa.json', JSON.stringify(caixa));
    }
};

exports.data = methods;