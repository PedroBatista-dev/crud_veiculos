module.exports = app => {
    // as rotas determinam as acoes a serem realizadas;
    app.route('/cars')
        .post(app.api.car.save)
        .get(app.api.car.get)

    app.route('/cars/:id')
        .put(app.api.car.save)
        .get(app.api.car.getById)
        .delete(app.api.car.remove)
}