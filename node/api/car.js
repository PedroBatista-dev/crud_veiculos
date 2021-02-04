// funcoes do crud de carros
module.exports = app => {
    // importando funcoes para validar os campos e objetos; 
    const { existsOrError, notExistsOrError } = app.api.validation;
    
    // funcao save adiciona ou atualiza um veículo, condicionado ao id nos parametros da requisicao; 
    const save = async (req, res) => {
        const car = { ...req.body };
        if (req.params.id) car.id = req.params.id

        try {
            existsOrError(car.placa, 'Placa não informada');
            existsOrError(car.chassi, 'Chassi não informado');
            existsOrError(car.renavam, 'Renavam não informado');
            existsOrError(car.modelo, 'Modelo não informado');
            existsOrError(car.marca, 'Marca não informada');
            existsOrError(car.ano, 'Ano não informado');

            const carFromDB = await app.db('cars')
                .where({ renavam: car.renavam }).first();
            if(!car.id) {
                notExistsOrError(carFromDB, 'Carro já cadastrado');
            }
        } catch(msg) {
            return res.status(400).send(msg);
        }

        // se existir id entao o veículo será atualizado, senao o veículo será adicionado;
        if(car.id) {
            app.db('cars')
                .update(car)
                .where({ id: car.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        } else {
            app.db('cars')
                .insert(car)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
    }

    // funcao get busca todos os carros cadastrados no tabela cars, selecinando todos os campos;
    const get = async (req, res) => {
        app.db('cars')
            .select('id', 'placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano')
            .then(cars => res.json(cars))
            .catch(err => res.status(500).send(err));
    }

    // funcao getById busca um carro pelo id do mesmo;
    const getById = async (req, res) => {
        app.db('cars')
            .select('id', 'placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano')
            .where({ id: req.params.id })
            .first()
            .then(car => res.json(car))
            .catch(err => res.status(500).send(err));
    }

    // funcao remove apaga um carro pelo id do mesmo;
    const remove = async(req, res) => {
        try {
            existsOrError(req.params.id, 'Id do carro não informado');

            const rowsDeleted = await app.db('cars')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Carro não foi encontrado');

            res.status(204).send();
        }catch(msg) {
            res.status(404).send(msg);
        }
    }
    return { save, get, getById, remove }
}