import { Task } from './task';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private taskUrl = 'http://localhost:3000/tasks';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  addTask(taskname: Task): Observable<Task> {
    return this.http.post<Task>(this.taskUrl, taskname, this.httpOptions);
  }

  getTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl);
  }

  deleteTask(id: string): Observable<Task> {
    return this.http.delete<Task>(`${this.taskUrl}/${id}`);
  }

  editTask(taskname: Task): Observable<Task> {
    return this.http.put<Task>(`${this.taskUrl}/${taskname.id}`, taskname);
  }
}