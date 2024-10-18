import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginDTO } from '@shared/dto/login.dto';
import { AuthService } from '@shared/services/auth.service';
import { TokenService } from '@shared/services/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{

  @ViewChild('formulario')formulario: ElementRef = {} as ElementRef;

  private auth_service = inject(AuthService);
  private token_service = inject(TokenService);

  email:string = '';
  password:string = '';

  login_sub:Subscription| null = null;

  ngOnDestroy(): void {
      if(this.login_sub){
        this.login_sub.unsubscribe();
      }
  }

  login(){
    let data:LoginDTO = {
      email: this.email,
      password: this.password
    }

    this.login_sub = this.auth_service.login(data)
    .subscribe({
      next:(token)=>{
        this.token_service.setToken(token)
      }

      
    })
  }
  addFocus(){
    let formulario = this.formulario.nativeElement
    let contenedores = this.formulario.nativeElement.querySelectorAll('.container-input');
    
    contenedores.forEach((element:any) => {

      if(element.classList.contains('focus')){
        element.classList.remove('focus')
      }else{
        element.classList.add('focus')
      }

  
      console.log(element)

  })




  }

  
}
