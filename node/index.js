const express = require('express');
const app = express();
const port = 3000;

const Database = require('./database');
const db = new Database();

db.connect();
db.createTable();
db.insertData();

app.get('/', (req, res) => {
    db.getData().then((results) => {
        const body = `
            <h1>Full Cycle Rocks!</h1>
            <ul>
            ${results.map(people => `<li>${people.name}</li>`).join('')}
            </ul>
        `
        res.send(body);
    }).catch((err) => {
        res.json(err);
    });
});

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
});

process.on('SIGINT', () => {
    db.close();
    process.exit();
});
