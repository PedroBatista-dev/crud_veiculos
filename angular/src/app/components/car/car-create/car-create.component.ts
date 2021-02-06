import { CarService } from './../car.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../car.model';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css']
})
export class CarCreateComponent implements OnInit {

  car: Car = {
    placa: "",
    chassi: "",
    renavam: "",
    modelo: "",
    marca: "",
    ano: 2021
  }

  constructor(private carService: CarService, private router: Router) { }

  ngOnInit(): void {
    
  }

  // aciona o service para adicionar um novo veículo;
  createCar(): void {
    this.carService.create(this.car).subscribe(() => {
      this.carService.showMessage('Veículo salvo com sucesso!');
      this.router.navigate(['/cars']);
    });
  }

  // cancelar operacao;
  cancel(): void {
    this.router.navigate(['/cars']);
}

}
