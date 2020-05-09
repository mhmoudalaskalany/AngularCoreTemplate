import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const token = this.storageService.getToken();
    if (token == null || token === '') {
      this.router.navigate(['/403']);

    }

    return true;
  }
}
