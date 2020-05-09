
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'core/services/storage/storage.service';
import { AlertService } from 'core/services/alert/alert.service';
import { Shell } from 'base/components/shell';
import { LoginModel } from './models/loginModel';
import { LoginService } from './services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  alert: AlertService = Shell.Injector.get(AlertService);
  model: LoginModel = {};
  constructor(private route: Router, public loginService: LoginService, public storageService: StorageService) {
  }

  ngOnInit() {
  }

  login() {
    // this.loginService.login(this.loginModel).subscribe(data => {
    //   console.log(data);
    // });
    this.route.navigate(['/main/home']);
    // this.loginService.login(this.loginModel).subscribe((data: any) => {
    //   if (data.status === 200) {
    //     this.storageService.setItem('token', data.data.token);
    //     this.storageService.setItem('userData', JSON.stringify(data.data));
    //     this.route.navigate(['/main']);
    //   }
    //   else {
    //     this.alert.showError('User or Password is Incorrect');
    //   }
    // }, error => {
    //   this.alert.showError('Error Login');
    // });

  }

}
