import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'core/services/auth/auth.service';

@Component({
  selector: 'app-un-authorized',
  templateUrl: './un-authorized.component.html',
  styleUrls: ['./un-authorized.component.scss']
})
export class UnAuthorizedComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    setTimeout(() => { this.redirectToLogin(); }, 4000);
  }


  redirectToLogin() {
    this.authService.redirectToLogin();
  }

}
