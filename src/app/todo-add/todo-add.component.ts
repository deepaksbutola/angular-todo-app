import { Task } from './../task';
import { TodoService } from './../todo.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {
  taskList: Task[] = [];
  @ViewChild ('taskName') taskInput: ElementRef;
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTaskList();
  }

  add(taskName: string): void {
    taskName = taskName.trim();
    if (!taskName) { return; }
    this.todoService.addTask({ id: uuid(), taskname: taskName })
    .subscribe(task => {
      this.taskList.push(task);
      this.taskInput.nativeElement.value = '';
      this.taskInput.nativeElement.focus();
    });
  }

  getTaskList() {
    this.todoService.getTask()
    .subscribe(tasks => {
      this.taskList = tasks;
    });
  }

}
