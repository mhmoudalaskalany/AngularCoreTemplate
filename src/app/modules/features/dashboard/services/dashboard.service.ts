import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  isSidebarPinned = false;
  isSidebarToggeled = false;
  isSidebarPinned$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  toggleSidebar() {
    this.isSidebarToggeled = !this.isSidebarToggeled;
  }

  toggleSidebarPin() {
    this.isSidebarPinned = !this.isSidebarPinned;
    return this.isSidebarPinned$.next(this.isSidebarPinned);
  }

  getSidebarStat() {
    return {
      isSidebarPinned: this.isSidebarPinned,
      isSidebarToggeled: this.isSidebarToggeled
    };
  }

}
