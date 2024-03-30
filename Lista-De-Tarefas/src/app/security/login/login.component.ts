import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../../User';
import { UsersService } from '../../users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formularioLogin: any;
  tituloFormulario: string;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {

      this.tituloFormulario = "Login - Lista de Tarefas"
      this.formularioLogin = new FormGroup({
        email: new FormControl('',[Validators.required, Validators.email]),
        senha: new FormControl('', Validators.required)
      });
  }

  // Submissão do formulário de login
  
  EnviarFormulario(): void {
    if (this.formularioLogin.valid) {
      const { email, senha } = this.formularioLogin.value;

      this.usersService.login(email, senha).subscribe(
        (resultado: User) => {
          // Salva os dados do usuário no armazenamento local para serem recuperados na próxima página
          localStorage.setItem('currentUser', JSON.stringify(resultado));
          // Navega para a próxima página
        this.router.navigate(['/dashboard']);
        },
        (error) => {
          // Lógica para lidar com erros, como exibir mensagens de erro para o usuário
          console.error('Erro ao fazer login:', error);
          alert('Falha no login. Verifique suas credenciais.');
        }
      );
    }
  }
}
