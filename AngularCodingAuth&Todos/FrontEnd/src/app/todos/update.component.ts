import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-update',
  template: `
  <form [formGroup]="updateForm" (ngSubmit)="update()">
      <input placeholder="title" formControlName ="title" />
      <textarea placeholder="description" formControlName="description"> </textarea>
      <input type="checkbox" formControlName="completed"/>
      <button type="submit">Update</button>
    </form>
  `,
  styles: [],
})
export class UpdateComponent {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private todoService = inject(TodosService);
  updateForm = this.formBuilder.group({
    _id: '',
    title: "",
    description: "",
    completed: false,
  });

  constructor() {
    const todo_id = this.route.snapshot.paramMap.get('todo_id');
    if (todo_id) {
      this.todoService.getById(todo_id as string).subscribe(response => {
        this.updateForm.get('_id')?.patchValue(response.data._id);
        this.updateForm.get('title')?.patchValue(response.data.title);
        this.updateForm.get('description')?.patchValue(response.data.description);
        this.updateForm.get('completed')?.patchValue(response.data.completed);

      })
    }
  }

  update() {}
}
