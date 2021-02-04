const app = require('express')();
const consign = require('consign');
const db = require('./config/db');

// importa o banco de dados para o app;
app.db = db;

// facilitar o gerenciamento das minhas dependencias, nao preciso ficar importando cada um dos arquivos/caminho relativo;
consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')   
    .into(app);

// roda a aplicacao na porta 3000;
app.listen(3000, () => {
    console.log('Backend executando...')
});

module.exports = app;