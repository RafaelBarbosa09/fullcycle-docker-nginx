const mysql = require('mysql');
const config = require('./config');

class Database {
    constructor() {
        this.connection = mysql.createConnection(config);
    }

    connect() {
        this.connection.connect((err) => {
            if (err) throw err;
            console.log('Conectado ao banco de dados.');
        });
    }

    createTable() {
        const query = `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (id));`;
        this.connection.query(query);
    }

    insertData() {
        const query = `INSERT INTO people(name) VALUES('Rafael'), ('Full cycle'), ('joão da silva')`;
        this.connection.query(query);
    }

    getData() {
        const sql = `SELECT * FROM people`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    close() {
        this.connection.end((err) => {
            if (err) throw err;
            console.log('Conexão encerrada.');
        });
    }
}

module.exports = Database;