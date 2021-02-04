import { CarService } from './../car.service';
import { Car } from './../car.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent implements OnInit {

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

  // aciona o service para deletar um novo veículo pelo seu id;
  deleteCar(): void {
    this.carService.delete(`${this.car.id}`).subscribe(() => {
      this.carService.showMessage('Veículo excluído com sucesso!');
      this.router.navigate(['/cars']);
    });
  }

  // cancela operacao;
  cancel(): void {
    this.router.navigate(['/cars']);
  }
}
