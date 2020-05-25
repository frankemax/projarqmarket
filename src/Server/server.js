const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser')
app.use(bodyParser.json())
const fs = require('fs');
const mongoose = require('mongoose')
const times = require("../Database/times.json")
const alunos = require("../Database/alunos.json")


app.post('/getAlunos', function (req, res) {
    res.send(
        alunos
    )
});

app.post('/getTimes', function (req, res) {
    res.send(
        times
    )
});

app.post('/remove', function (req, res) {
    var id = req.body.id
    var list = alunos.alunos
    remove(list, 'id', id);
    alunos["alunos"] = list
    fs.writeFileSync('./src/Database/alunos.json', JSON.stringify(alunos));
});

function remove(arr, attr, value) {
    let i = arr.length;
    while (i--) {
        if (arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value)) {

            arr.splice(i, 1);

        }
    }
    return arr;
}

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);