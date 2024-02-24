const { Client } = require('pg');

const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'teste',
    password: '26061996',
    port: 5432,
};

const client = new Client(dbConfig);

client.connect()
    .then(() => console.log('Conectado ao banco de dados PostgreSQL'))
    .catch(err => console.error('Erro ao conectar ao banco de dados', err));

module.exports = client;
