const assert = require('assert');
const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();
// testa todas as operacoes do crud
describe('Teste Carro', () => {    

    describe('#get()', () => {
        it('Deve retornar um vetor de carros', () => {
              chai.request(app).get("/cars").end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              });
          });
      });

    describe('#post()', () => {
        it('Deve adicionar um carro com todos os dados', () => {

            let car = {
                placa: "placa_teste",
                chassi: "chassi_teste",
                renavam: "renavam_teste",
                modelo: "modelo_teste",
                marca: "marca_teste",
                ano: 2021
            }

            chai.request(app).post("/cars").send(car).end((err, res) => {
                res.should.have.status(204);
                res.body.should.be.a('object');
            });
        });
    });

    describe('#getById()', () => {
            it('Deve retornar um carro pelo id', () => {
                const id = 1;
                chai.request(app).get(`/cars/${id}`).end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                });
            });
    });

    describe('#delete()', () => {
        it('Deve excluir um carro pelo id', () => {
            const id = 21;
            chai.request(app).delete(`/cars/${id}`).end((err, res) => {
                res.should.have.status(204);
                res.body.should.be.a('object');
            });
        });
    });

    describe('#put()', () => {
        it('Deve atualizar um carro com todos os dados', () => {

            let car = {
                id: 1,
                placa: "placa_teste",
                chassi: "chassi_teste",
                renavam: "renavam_teste",
                modelo: "modelo_teste",
                marca: "marca_teste",
                ano: 2020
            }

            chai.request(app).put(`/cars/${car.id}`).send(car).end((err, res) => {
                res.should.have.status(204);
                res.body.should.be.a('object');
            });
        });
    });
});