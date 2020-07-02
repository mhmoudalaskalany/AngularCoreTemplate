
import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'features/dashboard/services/dashboard.service';
import { TranslationService } from 'core/services/localization/translation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  lang;
  constructor(
    private dashboardService: DashboardService,
    private translateService: TranslationService
  ) { }
  isCollapsed = true;
  ngOnInit() {
    this.translateService.currentLanguage.subscribe(lang => this.lang = lang);
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
    console.log('language', this.translateService.lang);
  }

}
