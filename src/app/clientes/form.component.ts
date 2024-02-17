import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Region } from './Region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {

  public cliente : Cliente = new Cliente;
  regiones : Region[];
  private titulo : string = "Agregar cliente";

  public errores : string[];

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
    });
    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  public update() : void{
    this.clienteService.update(this.cliente)
    .subscribe(cliente =>{
      this.router.navigate(['/clientes'])
      swal('Cliente actualizado',`Cliente ${this.cliente.nombre} actualizado exitosamente`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
    })
  }

  public create(): void{
    this.clienteService.create(this.cliente).subscribe(
    cliente =>{
      this.router.navigate(['/clientes'])
      swal('Cliente agregado',`Cliente ${this.cliente.nombre} creado con exitosamente`, 'success')
  },
  err => {
    this.errores = err.error.errors as string[];
  });
  }

  public compararRegion(o1: Region, o2: Region) {
    if (o1 === undefined && o2 === undefined){
      return true;
    }
    return (o1 && o2) ? o1.id === o2.id : false;
  }
  

  

}
