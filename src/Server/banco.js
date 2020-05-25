const express = require('express');
const sqlite3 = require('sqlite3').verbose();
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser')
const fs = require('fs');
const app = express();
const mongoose = require('mongoose')


// open the database
let db = new sqlite3.Database('./src/Database/databaseTeams.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

//printa os nomes de todos os alunos cadastrados

function listAllAlunos(callback) {
    var str = ""
    db.serialize(() => {
            db.each(`SELECT * FROM Aluno`, (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                return callback(`"${row.Matricula}":{"Nome": ${row.Nome},"Curso": ${row.Curso},"TimeId": ${row.TimeId}},`)
            });
        }
    );
}

function listAllAlunosInTimes() {
    db.serialize(() => {
        db.each(`SELECT * FROM Aluno,TimesHacka WHERE Aluno.TimeId==TimesHacka.NumeroDoTime`, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            console.log(row.Nome + "\t" + row.Matricula);
        });
    });
}

function editTeam() {
    db.serialize(() => {
        db.each(`UPDATE Aluno
            SET TimeId = 8
            WHERE Nome = 'carlinho'`, (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    });
}


/*var stuff_i_want = '';

listAllAlunos(function (result) {
    stuff_i_want += result;
    test(stuff_i_want)
})

function test(data){
    console.log(data)
}*/

var data = '';
listAllAlunos(function (result) {
    data += result;
})

function att(){
    data = ''
    listAllAlunos(function (result) {
        data += result;
    })
}

app.post('/getAlunos', function (req, res) {
    res.send(
        '{"a":[{"nome":"lucas","id":42, "curso": "CC", "time": "nata"},{"nome":"schell","id":69, "curso": "ES", "time": "nata"}]}'
    )
});

/*app.get('/getAlunos', function (req, res) {
    att()
    res.send(
        data
    )
});*/


//fecha conexao do bd
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
