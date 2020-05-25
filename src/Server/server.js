const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser')
app.use(bodyParser.json())
const fs = require('fs');
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

app.post('/getTimeName', function (req, res) {
    var aux = []
    times.times.forEach(function (item) {
        aux.push(item.nomeTime)
    });
    res.send(JSON.stringify(aux))
});

app.post('/setTimes', function (req, res) {
    var id = req.body.id
    var time = req.body.time
    var list = alunos.alunos
    list.forEach(function (item, index) {
        if(item.id === id){
            item.time = time
        }
    });
    alunos["alunos"] = list
    fs.writeFileSync('./src/Database/alunos.json', JSON.stringify(alunos));
    res.send(true)
});

app.post('/setOpcao', function (req, res) {
    var id = req.body.id
    var time = req.body.opcao
    var list = alunos.alunos
    list.forEach(function (item) {
        if(item.id == id){
            item.opcao = time
        }
    });
    alunos["alunos"] = list
    fs.writeFileSync('./src/Database/alunos.json', JSON.stringify(alunos));
    res.send(true)
});

app.post('/setScore', function (req, res) {
    var list = times.times
    var aux = []
    list.forEach(function (item) {
        if(item.nomeTime === req.body.time){
            aux.push(parseInt(req.body.funcionalidade))
            aux.push(parseInt(req.body.processo))
            aux.push(parseInt(req.body.pitch))
            aux.push(parseInt(req.body.inovacao))
            aux.push(parseInt(req.body.formacaodotime))
            item.nota.push(aux);
        }
    });
    times["times"] = list
    fs.writeFileSync('./src/Database/times.json', JSON.stringify(times));
    res.send(true)
});

app.post('/createTime', function (req, res) {
    times["times"].push({
        nomeTime: req.body.nome,
        nota: []
    })
    res.send(true)
    fs.writeFileSync('./src/Database/times.json', JSON.stringify(times));
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