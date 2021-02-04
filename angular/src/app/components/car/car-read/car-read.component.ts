import { CarService } from './../car.service';
import { Car } from './../car.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-read',
  templateUrl: './car-read.component.html',
  styleUrls: ['./car-read.component.css']
})
export class CarReadComponent implements OnInit {

  cars: Car[] = [];
  displayedColumns = ['id', 'placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano', 'acao'];

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    // aciona o service para buscar todos os veículos e exibir na tela;
    this.carService.read().subscribe(cars => {
      this.cars = cars;
    })
  }

}
