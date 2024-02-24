const express = require('express');
const router = express.Router();
const client = require('../config/database');

router.get('/', (req, res) => {
    client.query('SELECT * FROM products')
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.error('Erro ao buscar produtos:', err);
            res.status(500).json({ error: 'Erro ao buscar produtos' });
        });
});

router.post('/', (req, res) => {
    const { title, brand, description } = req.body;

    const query = 'INSERT INTO products (title, brand, description) VALUES ($1, $2, $3) RETURNING *';
    const values = [title, brand, description];

    client.query(query, values)
        .then(result => {
            res.status(201).json(result.rows[0]);
        })
        .catch(err => {
            console.error('Erro ao inserir produto:', err);
            res.status(500).json({ error: 'Erro ao inserir produto' });
        });
});

module.exports = router;
