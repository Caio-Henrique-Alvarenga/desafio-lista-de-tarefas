import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './Task';
import { Observable } from 'rxjs';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  url = 'http://localhost:5278/api/tasks'

  constructor(private http: HttpClient) { }

  RecuperarTasksFromUser(userId: number) : Observable<Task[]>{
    const apiUrl = `${this.url}/usertasks/${userId}`;
    return this.http.get<Task[]>(apiUrl);
  }

  FiltrarTasksCompletas(userId: number): Observable<Task[]>{
    const apiUrl = `${this.url}/usertasks/${userId}/completas`;
    return this.http.get<Task[]>(apiUrl);
  }

  FiltrarTasksIncompletas(userId: number): Observable<Task[]>{
    const apiUrl = `${this.url}/usertasks/${userId}/incompletas`;
    return this.http.get<Task[]>(apiUrl);
  }

  CriarTask(task: Task) : Observable <any>{
    return this.http.post<Task>(this.url, task, httpOptions);
  }

  AtualizarTask(task: Task) : Observable<any>{
    return this.http.put<Task>(this.url, task, httpOptions);
  }

  ExcluirTask(taskId: number) : Observable<any>{
    const apiUrl = `${this.url}/${taskId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }

}
