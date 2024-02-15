import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ModalService } from './detalle/modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'
import { tap } from 'rxjs';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})


export class ClientesComponent {
  clientes: Cliente[];  
  public paginador : any;
  clienteSeleccionado : Cliente;

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService : ModalService) { }
    

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page'); //El operador + convierte a number
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page).pipe(
        tap(response => {
          console.log('ClientesComponent: tap 3');
          (response.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombre);
          });
        })
      ).subscribe(response => {
        this.clientes = response.content as Cliente[]
        this.paginador = response;
      });
    })
    this.modalService.notificarUpload.subscribe(cliente =>{
      this.clientes = this.clientes.map(clienteOriginal =>{
        if(cliente.id==clienteOriginal.id){
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      })
    })
  }

  delete(cliente: Cliente): void {
    swal({
      title: "¿Estás seguro?",
      text: `¿Seguro quiere eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonClass: 'btn- btn success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          Response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal(
              'Cliente eliminado!',
              'El cliente ha sido eliminado exitosamente',
              'success'
            );
          }
        )

      }
    });

  }

  abrirModal(cliente:Cliente){
    this.clienteSeleccionado=cliente;
    this.modalService.abrirModal();
  }

}
