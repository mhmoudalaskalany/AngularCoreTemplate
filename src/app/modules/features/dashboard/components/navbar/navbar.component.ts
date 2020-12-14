import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'features/dashboard/services/dashboard.service';
import { TranslationService } from 'core/services/localization/translation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  lang;
  isCollapsed = true;

  constructor(private dashboardService: DashboardService, private translateService: TranslationService, private router: Router) { }

  ngOnInit() {
    this.translateService.currentLanguage.subscribe(lang => this.lang = lang);
    console.log(this.lang);
  }

  toggleSidebarPin() {
    this.dashboardService.toggleSidebarPin();
  }

  toggleSidebar() {
    this.dashboardService.toggleSidebar();
  }

  setLanguage(lang: string): void {
    this.lang = lang;
    this.translateService.setLanguage(lang);
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}