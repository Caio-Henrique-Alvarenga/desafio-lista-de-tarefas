import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../../User';
import { UsersService } from '../../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  formularioRegistro: any;
  tituloFormulario: string;

  constructor(private usersService: UsersService, private router: Router) {}

  
  ngOnInit(): void {

      this.tituloFormulario = "Novo Usuário"
      this.formularioRegistro = new FormGroup({
        email: new FormControl('',[Validators.required, Validators.email]),
        username: new FormControl('',Validators.required),
        senha: new FormControl('',Validators.required)
      });
  }

  // Submissão do relatório de criação de usuário
  EnviarFormulario() : void {
    console.log("Entrou")
    const user : User = this.formularioRegistro.value;

    this.usersService.CriarUser(user).subscribe(resultado =>{
      this.router.navigate(['/login']);
    })
  }

}
