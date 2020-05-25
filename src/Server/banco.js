const mongoose = require('mongoose')


const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());

// Configuracao inicial do Mongoose

mongoose.connect('mongodb://localhost/database', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', err => {
    throw 'failed connect to MongoDB';

});


// define a tabela usuario
const Aluno = mongoose.model('User', {

    nome: {
        type: String,
    },

    id: {
        type: Number,
    },

    curso: {
        type: String,
    },

    time: {
        type: String,
    }

})


// define a tabela time
const Time = mongoose.model("Time", {

    nome: {
        type: String,
    },
    nota1: {
        type: Number,
    },
    nota2: {
        type: Number,
    },
    nota3: {
        type: Number,
    },
    nota4: {
        type: Number,
    },
    nota5: {
        type: Number,
    }
})


// modelo de criacao de aluno
const carlosTime = new Time({

    nome: 'Caralho',
    nota1: 4,
    nota2: 3,
    nota3: 1,
    nota4: 5,
    nota5: 5

})

console.log("CARLAO POR FAVOR")

carlosTime.save().then(() => {
    console.log(carlosTime)
}).catch((err) => {
    console.log("Socorro, merdei" + err)
})

console.log("CARLAO POR FAVOR")


async function atualizaTime(alunoId, time) {

    const filter = {id: alunoId};
    const update = {time: time};

    let doc = await Aluno.findOneAndUpdate(filter, update)

}

async function removeAluno(id) {

    await Aluno.findOneAndDelete(id)

}

app.get('/meme', async (req, res) => {

    const users = await Aluno.find({});

    const userMap = {};
    users.forEach((user) => {
        userMap[user._id] = user;
        console.log(user)
    });

    res.send(userMap);

});

app.post('/getAlunos', function (req, res) {
    res.send(
        '{"a":[{"nome":"lucas","id":42, "curso": "CC", "time": "nata"},{"nome":"schell","id":69, "curso": "ES", "time": "nata"}]}'
    )
});

async function retornaAlunos() {

    Aluno.find().lean().exec(function (err, users) {
        return res.end(JSON.stringify(users));
    })


}

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);