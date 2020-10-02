import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'features/dashboard/services/dashboard.service';
import { TranslationService } from 'core/services/localization/translation.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  lang

  constructor(private dashboardService: DashboardService, private translation: TranslationService) { }

  ngOnInit() {
    this.translation.currentLanguage.subscribe(lang => this.lang = lang);
  }

  getClasses() {
    const classes = {
      'pinned-sidebar': this.dashboardService.getSidebarStat().isSidebarPinned,
      'toggeled-sidebar': this.dashboardService.getSidebarStat().isSidebarToggeled,
      'rtl': this.lang === 'ar'
    };

    return classes;
  }
  toggleSidebar() {
    this.dashboardService.toggleSidebar();
  }

}
