
import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'features/dashboard/services/dashboard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }
  isCollapsed = true;
  ngOnInit() {
  }

  toggleSidebarPin() {
    this.dashboardService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.dashboardService.toggleSidebar();
  }

}
