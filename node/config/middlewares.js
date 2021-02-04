const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = app => {
    // importa os dois modulos para o app
    app.use(bodyParser.json());
    app.use(cors());
};