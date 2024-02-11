import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {

  public cliente : Cliente = new Cliente;
  private titulo : string = "Agregar cliente";

  constructor(private clienteService : ClienteService,
    private router : Router,
    private activatedRoute : ActivatedRoute){}

  ngOnInit(){
    this.cagarCliente();
  }

  public cagarCliente() : void {
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

  public update() : void{
    this.clienteService.update(this.cliente)
    .subscribe(cliente =>{
      this.router.navigate(['/clientes'])
      swal('Cliente actualizado',`Cliente ${this.cliente.nombre} actualizado exitosamente`, 'success')
    })
  }

  public create(): void{
    this.clienteService.create(this.cliente).subscribe(
    cliente =>{
      this.router.navigate(['/clientes'])
      swal('Cliente agregado',`Cliente ${this.cliente.nombre} creado con exitosamente`, 'success')
  }
    );
  }

  

}
