import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-crud',
  templateUrl: './car-crud.component.html',
  styleUrls: ['./car-crud.component.css']
})
export class CarCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // realiza a navegacao do usuário para a tela de novo veículo;
  navigateToCarCreate(): void {
    this.router.navigate(['/cars/create']);
  }

}
