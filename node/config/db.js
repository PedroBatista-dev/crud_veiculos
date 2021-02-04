const config = require('../knexfile.js');
const knex = require('knex')(config);

//cria a tabela de carros
knex.migrate.latest([config]);
module.exports = knex