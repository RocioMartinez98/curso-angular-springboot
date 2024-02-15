import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, map, tap, throwError } from 'rxjs';
import { of , catchError} from 'rxjs';
import { HttpClient, HttpHeaders,HttpEvent, HttpRequest } from '@angular/common/http';
import swal from 'sweetalert2';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes'

  private httpHeaders = new HttpHeaders({'content-type' : 'application/json'})

  constructor(private http: HttpClient,
    private router : Router
    ) {}

  getClientes(page: number) : Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response : any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
      map((response : any) => {
        (response.content as Cliente[]).map(cliente => {
          return cliente;
        });
        return response;
      }),
      tap(response =>{
        console.log('clienteService: tap 2');
        (response.content as Cliente[]).forEach(cliente =>{
        console.log(cliente.nombre);
        });
      })
    )

  }

  create( cliente : Cliente) : Observable<Cliente[]>{
    return this.http.post<Cliente[]>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError( e => {

        if(e.status == 400){
          return throwError(() => e);
        }

        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal('Error al editar', e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  delete(id : number) : Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }


  update( cliente : Cliente) : Observable<Cliente[]>{
    return this.http.put<Cliente[]>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError( e => {

        if(e.status == 400){
          return throwError(() => e);
        }

        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });
    return this.http.request(req);

  }

}
