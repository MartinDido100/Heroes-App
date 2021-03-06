import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    button{
      padding: 0 50px;
    }
  `
  ]
})
export class LoginComponent {

  constructor(private router: Router,
              private autService: AuthService) { }

  login(){
    //Ir al backend
    //un usuario

    this.autService.login().subscribe(
      resp => {
        if(resp.id){
          this.router.navigate(['./heroes'])
        }
      }
    )
  }

  sinLogin(){
    this.autService.logSinUser();
    this.router.navigate(['./heroes'])
  }
}
