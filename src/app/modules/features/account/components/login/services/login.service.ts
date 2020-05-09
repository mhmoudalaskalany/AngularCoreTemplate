import { Injectable } from '@angular/core';
import { HttpService } from 'core/services/http/http.service';
import { LoginModel } from '../models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends HttpService {

  protected get baseUrl(): string {
    return 'I/Accounts/';
  }
  login(loginModel: LoginModel) {
    return this.postReq('Login', loginModel);
  }
}
