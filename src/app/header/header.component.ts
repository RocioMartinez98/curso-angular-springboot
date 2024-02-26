import { Component } from "@angular/core";
import { AuthService } from "../usuarios/auth.service";
import swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
    selector:'app-header',
    templateUrl:`./header.component.html`,
    styleUrls: [`./header.component.css`]
})

export class HeaderComponent{
    title : string = "App Angular"

    constructor(public authService: AuthService,private router:Router){}

    logout():void{
       this.authService.logout();
       swal('LogOut','Ha cerrado sesión exitosamente','success');
       this.router.navigate(['/clientes']);
    }
    
}