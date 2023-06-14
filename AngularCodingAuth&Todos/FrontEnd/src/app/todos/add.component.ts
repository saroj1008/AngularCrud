import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ITodo, TodosService } from './todos.service';

@Component({
  selector: 'app-add',
  template: `
    <form [formGroup]="bookForm" (ngSubmit)="addNewBook()">
      <input placeholder="title" formControlName="title" />
      <textarea placeholder="description" formControlName="description" > </textarea>
      <input type="checkbox" formControlName="completed" />
      <button type="submit" [disabled]="bookForm.invalid" >Add</button>
    </form>
  `,
  styles: [],
})
export class AddComponent {
  private router = inject(Router);
  private notification = inject(ToastrService);
  private todosService = inject(TodosService);

  bookForm = inject(FormBuilder).nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    completed: false,
  });

  addNewBook() {
    this.todosService.add(this.bookForm.value as ITodo).subscribe(response => {
      if(response.success) {
        this.notification.success("Added Sucessfully");
        this.router.navigate(['','todos']);
      }
    })
  }
}
