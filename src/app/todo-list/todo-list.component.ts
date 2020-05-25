import { TodoService } from './../todo.service';
import { Task } from './../task';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() tasklist: Task[];
  @ViewChild('editTask') editTask: ElementRef;
  private task: Task;
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {}

  delete(item: Task) {
    this.todoService.deleteTask(item.id).subscribe(res => {
      const index = this.tasklist.indexOf(item);
      this.tasklist.splice(index, 1);
    });
  }

  openEditModal(item: Task) {
    this.editTask.nativeElement.value = item.taskname;
    this.task = item ;
    $('#editModal').modal('show');
  }

  edit() {
    console.log('edit');
    this.task.taskname = this.editTask.nativeElement.value
    this.todoService.editTask(this.task).subscribe(res => {
      $('#editModal').modal('hide');
    });
  }
}
