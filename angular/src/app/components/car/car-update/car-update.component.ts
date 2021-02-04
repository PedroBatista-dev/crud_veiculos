import { Car } from './../car.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from './../car.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  car: Car = {} as Car;

  constructor(private carService: CarService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // obtem o id pelos parametros da rota;
    const id = this.route.snapshot.paramMap.get('id');
    if(id)
    this.carService.readById(id).subscribe(car => {
      this.car = car;
    });
  }

  // aciona o service para atualizar um veículo pelo seu id;
  updateCar(): void {
    this.carService.update(this.car).subscribe(() => {
      this.carService.showMessage('Produto atualizado com sucesso!');
      this.router.navigate(['/cars']);
    });
  }

  // cancela operacao;
  cancel(): void {
    this.router.navigate(['/cars']);
  }

}
