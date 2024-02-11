import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})


export class ClientesComponent {
  clientes: Cliente[];

  

  constructor(private clienteService : ClienteService,
    private router : Router,
    private activatedRoute : ActivatedRoute){}

  

  ngOnInit(){
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente : Cliente) : void{
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

}
