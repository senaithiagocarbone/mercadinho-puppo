const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const Produto = require('./produto');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const DB_FILE = path.join(__dirname, 'db.json');

function lerDB() {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
}

function salvarDB(db) {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// GET todos produtos
app.get('/api/produtos', (req, res) => {
    const db = lerDB();
    res.json(db.produtos);
});

// GET produto por ID
app.get('/api/produtos/:id', (req, res) => {
    const db = lerDB();
    const produto = db.produtos.find(p => p.id == req.params.id);
    if(produto) res.json(produto);
    else res.status(404).json({ message: "Produto não encontrado" });
});

// POST criar produto
app.post('/api/produtos', (req, res) => {
    const db = lerDB();
    const { nome, preco, quantidade } = req.body;
    const id = db.produtos.length > 0 ? db.produtos[db.produtos.length - 1].id + 1 : 1;
    const novoProduto = new Produto(id, nome, preco, quantidade);
    db.produtos.push(novoProduto);
    salvarDB(db);
    res.status(201).json(novoProduto);
});

// PUT atualizar produto
app.put('/api/produtos/:id', (req, res) => {
    const db = lerDB();
    const produto = db.produtos.find(p => p.id == req.params.id);
    if(produto) {
        const { nome, preco, quantidade } = req.body;
        produto.nome = nome;
        produto.preco = preco;
        produto.quantidade = quantidade;
        salvarDB(db);
        res.json(produto);
    } else {
        res.status(404).json({ message: "Produto não encontrado" });
    }
});

// DELETE produto
app.delete('/api/produtos/:id', (req, res) => {
    const db = lerDB();
    const index = db.produtos.findIndex(p => p.id == req.params.id);
    if(index !== -1) {
        db.produtos.splice(index, 1);
        salvarDB(db);
        res.json({ message: "Produto deletado" });
    } else {
        res.status(404).json({ message: "Produto não encontrado" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

