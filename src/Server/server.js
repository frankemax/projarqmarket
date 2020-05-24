const express = require('express');
const sqlite3 = require('sqlite3').verbose();
var cors = require('cors');
var bodyParser = require('body-parser')
const fs = require('fs');
const app = express();


// open the database
let db = new sqlite3.Database('../Database/databaseTeams.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

//printa os nomes de todos os alunos cadastrados
function listAllAlunos(){
    db.serialize(() => {
        db.each(`SELECT * 
    FROM Aluno`, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            console.log(row.Nome + "\t"+ row.Matricula);
        });
    });
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

function editTeam(){
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
editTeam()
listAllAlunosInTimes()

app.post('/getAlunos', function (req, res) {
    res.send(
        '{"result":true, "count":42}'
    )
});




//fecha conexao do bd
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});




const port = 5000;

app.listen(port, () => `Server running on port ${port}`);