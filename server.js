const express = require('express');
const data = require("./src/database.json")
var cors = require('cors');
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());

app.post('/getProduto', function (req, res) {
    if (data[req.body.id] == undefined) {
        res.send(null)
    } else {
        res.send(
            data[req.body.id]
        )
    }
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);