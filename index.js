const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'eventodb',
})

connection.connect(function (err) {
    if (err) {
        console.error('erro conectando banco: ' + err.stack())
        return;
    }

    console.log('Banco conectado')
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//Rotas
app.get('/eventos', function (req, res) {
    connection.query('select * from evento',
        function (error, results, fields) {
            if (error)
                res.json;
            else
                res.json(results);
            console.log('executou /eventos');
        }

    )
});

app.post('/add_eventoo', function (req, res) {
    var sql = "insert into evento(nome, date_hora) values('da certo', '2020-12-25 11:11:11')"
    connection.query(function (error, results, fields) {
        if (error)
            res.json;
        else
            res.json(results);
        console.log('executou /add_eventoo');
    });
});

app.post('/add_evento', function (_nome, _data, req, res) {
    console.log(req.body)
    var nomeEvento = _nome
    var dataEvento = moment(_data).format("ll")
    connection.query(`insert into evento(nome, date_hora) values('${nomeEvento}', '${dataEvento}')`, function (error, results, fields) {
        if (error)
            res.json;
        else
            res.json(results);
        console.log('executou /add_evento');
    });
});

app.listen(80, function () {
    console.log('Server escutou\n')
});