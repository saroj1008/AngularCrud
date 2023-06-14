import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  signin(data: { email: string, password: string }) {
    return this.http.post<IResponse<string>>('http://localhost:3000/'+'auth/signin', data);
  }

  signUp(data: IUser) {
    return this.http.post<IResponse<string>>('http://localhost:3000/'+'auth/signup', data);
  }

}

export interface IUser{
  _id?: string, 
  fullname:string,
  email: string,
  password: string,
  pictures?: Array<{_id:string, url: string}>
}

export interface IResponse <T= unknown> {
  success: true,
  data: T
}

export interface IToken {
  _id: string,
  fullname: string,
  email: string,
}