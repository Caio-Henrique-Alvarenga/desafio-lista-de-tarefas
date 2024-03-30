import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './User';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'http://localhost:5278/api/users'
  constructor(private http: HttpClient) { }

  PegarTodos(): Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }

  PegarPeloId(userId: number): Observable<User>{
    const apiUrl = `${this.url}/${userId}`;
    return this.http.get<User>(apiUrl);
  }

  CriarUser(user: User) : Observable<any>{
    return this.http.post<User>(this.url, user, httpOptions);
  }

  AtualizarUser(user : User) : Observable<any>{
    return this.http.put<User>(this.url, user, httpOptions);
  }

  ExcluirUser(userId: number) : Observable<any>{
    const apiUrl = `${this.url}/${userId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }

  login(email: string, senha: string): Observable<User> {
    const apiUrl = `${this.url}/login/${email}/${senha}`;
    return this.http.get<User>(apiUrl);
  }
  
}
