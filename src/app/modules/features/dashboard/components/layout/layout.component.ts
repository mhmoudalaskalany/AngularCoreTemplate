import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'features/dashboard/services/dashboard.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  }
  getClasses() {
    const classes = {
      'pinned-sidebar': this.dashboardService.getSidebarStat().isSidebarPinned,
      'toggeled-sidebar': this.dashboardService.getSidebarStat().isSidebarToggeled
    }
    return classes;
  }
  toggleSidebar() {
    this.dashboardService.toggleSidebar();
  }

}
