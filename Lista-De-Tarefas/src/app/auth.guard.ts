import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verifica se o usuário está autenticado (por exemplo, verifica se o token de autenticação está presente)
    if (localStorage.getItem('currentUser')) {
      // Usuário autenticado, permite o acesso à rota
      return true;
    } else {
      // Usuário não autenticado, redireciona para a página de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
