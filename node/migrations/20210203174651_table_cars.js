// controlar a evolucao do banco de dados
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cars', table => {
        table.increments('id').primary();
        table.string('placa').notNull().unique();
        table.string('chassi').notNull().unique();
        table.string('renavam').notNull().unique();
        table.string('modelo').notNull();
        table.string('marca').notNull();
        table.integer('ano').notNull();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
