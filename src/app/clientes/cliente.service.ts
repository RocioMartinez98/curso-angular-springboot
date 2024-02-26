import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, map, tap, throwError } from 'rxjs';
import { of , catchError} from 'rxjs';
import { HttpClient,HttpEvent, HttpRequest } from '@angular/common/http';
import {Router} from '@angular/router';
import { Region } from './Region';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes'

  //private httpHeaders = new HttpHeaders({'content-type' : 'application/json'})

  constructor(private http: HttpClient,
    private router : Router,
    ) {}

    /*private agregarAuthorizationGeader(){
      let token = this.authService.token;
      if(token != null){
        return this.httpHeaders.append('Authorization','Bearer'+token)
      }
      return this.httpHeaders;
    }*/

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
    return this.http.post<Cliente[]>(this.urlEndPoint, cliente).pipe(
      catchError( e => {
        /*if(this.isNoAutorizado(e)){
          return throwError(e)
        }*/

        if(e.status == 400){
          return throwError(() => e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(() => e);
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        /*if(this.isNoAutorizado(e)){
          return throwError(e)
        }*/
        if(e.status !=401 && e.error.mensaje){
          console.error(e.error.mensaje);
          this.router.navigate(['/clientes']);
        }
        console.error(e.error.mensaje);
        return throwError(() => e);
      })
    );
  }

  delete(id : number) : Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {

        /*if(this.isNoAutorizado(e)){
          return throwError(e)
        }*/

        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(() => e);
      })
    );
  }


  update( cliente : Cliente) : Observable<Cliente[]>{
    return this.http.put<Cliente[]>(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
      catchError( e => {

        /*if(this.isNoAutorizado(e)){
          return throwError(e);
        }*/

        if(e.status == 400){
          return throwError(() => e);
        }

        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(() => e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    /*let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if(token!=null){
      httpHeaders = httpHeaders.append('Authorization', 'Bearer' + token);
    }*/
    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });
    return this.http.request(req);

  }

  getRegiones() : Observable<Region[]>{
     return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  }

  /*private isNoAutorizado(e) : boolean{
    if(e.status == 401){
      if(this.authService.isAuthenticated){
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }
    if(e.status == 403){
      swal('Permiso denegado','No tienes permiso para realizar esta acción','warning');
      this.router.navigate(['/clientes']);
      return true;
    }
    return false;
  }*/

}
