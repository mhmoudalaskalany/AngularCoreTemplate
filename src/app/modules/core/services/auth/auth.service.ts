import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { APIURL } from '../Apis/api';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Auth Services
 * the main service for authentications
 */
export class AuthService {
  constructor(private http: HttpService, private storage: StorageService, private route: Router) { }

  login(loginData): Observable<any> {
    return this.http.postReq(APIURL.login, loginData);
  }

  redirectToLogin(): void {
    this.route.navigate(['/login']);
  }

  logout() {
    this.storage.clearStorage();
    this.route.navigate(['/login']);
  }

}
