import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IResponse } from '../auth.service';
import { environment as env} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private http = inject(HttpClient);

list() {
  return this.http.get<IResponse<ITodo[]>>('http://localhost:3000/'+'todos');
}

add (todo: ITodo) {
  return this.http.post<IResponse<ITodo>>('http://localhost:3000/'+'todos',todo);
}

delete (todo_id: string) {
  return this.http.delete<IResponse<boolean>>('http://localhost:3000/'+'todos/'+todo_id);
}
getById (todo_id: string) {
  return this.http.get<IResponse<ITodo>>('http://localhost:3000/'+'todos/'+todo_id);
}

update (todo:ITodo) {
  return this.http.put<IResponse<ITodo>>('http://localhost:3000/'+'todos/'+todo._id, todo) ;
}



}

export interface ITodo{
  _id:string,
  user_id: string,
  title: string,
  description: string,
  completed: boolean
}
