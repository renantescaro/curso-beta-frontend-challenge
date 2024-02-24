const express = require('express');
const router = express.Router();
const client = require('../config/database');

router.get('/', (req, res) => {
    client.query('SELECT * FROM products')
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.error('Erro ao buscar usuários:', err);
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        });
});

module.exports = router;
