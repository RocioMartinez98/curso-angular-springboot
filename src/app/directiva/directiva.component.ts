import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})

export class DirectivaComponent {
  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'PHP']
  habilitar: boolean = true;

  constructor(){

  }

  estadoBoton() : void{
  this.habilitar= (this.habilitar==true)? false : true

  }

}
