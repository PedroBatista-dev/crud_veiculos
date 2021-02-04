import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { Car } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  baseUrl = "http://localhost:3000/cars";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  // exibe mensagens de sucesso ou erro das operacoes ao usuario;
  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    });
  } 

  // cria um veículo no banco de dados;
  create(car: Car): Observable<Car> {
    return this.http.post<Car>(this.baseUrl, car).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandle(e))
    );
  }  

  // busca todos os veículos no banco de dados;
  read(): Observable<Car[]> {
    return this.http.get<Car[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandle(e))
    );
  }

  // busca um veículo no banco de dados pelo seu id;
  readById(id: string): Observable<Car> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Car>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandle(e))
    );
  }

  // atualiza um veículo no banco de dados pelo seu id;
  update(car: Car): Observable<Car> {
    const url = `${this.baseUrl}/${car.id}`;
    return this.http.put<Car>(url, car).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandle(e))
    );
  }

  // deleta um veículo no banco de dados pelo seu id;
  delete(id: string): Observable<Car> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Car>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandle(e))
    );
  }

  // mensagem exibida em caso de erro em alguma operacao;
  errorHandle(e: any): Observable<any> {
    console.log(e);
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
