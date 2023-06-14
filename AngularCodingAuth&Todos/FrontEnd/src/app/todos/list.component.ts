import { Component, inject } from '@angular/core';
import { ITodo, TodosService } from './todos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  template: `
    <button (click)="goToAdd()">Add a new todo</button>

    <div *ngFor="let item of todosList">
      <a [routerLink]="['', 'todos', 'update', item._id]"> {{ item.title }}</a>
      <button (click)="deleteItem(item._id)">X</button>
    </div>
  `,
  styles: [],
})
export class ListComponent {
  private todosService = inject(TodosService);
  private router = inject(Router);
  private notification = inject(ToastrService);
  todosList: ITodo[] = [];
  constructor() {
    this.todosService.list().subscribe((response) => {
      console.log('tst', response);
      this.todosList = response.data;
    });
  }

  goToAdd() {
    this.router.navigate(['', 'todos', 'add']);
  }

  deleteItem(todo_id: string) {
    this.todosService.delete(todo_id).subscribe((response) => {
      if (response.success) {
        this.todosList = this.todosList.filter((todo) => todo._id !== todo_id);
        this.notification.success('Delete Sucessfully');
      }
    });
  }
}
