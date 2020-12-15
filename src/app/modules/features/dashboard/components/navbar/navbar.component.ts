import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'features/dashboard/services/dashboard.service';
import { TranslationService } from 'core/services/localization/translation.service';
import { Router } from '@angular/router';
import { Shell } from 'base/components/shell';
import { StorageService } from 'core/services/storage/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  lang;
  isCollapsed = true;
  get Translate(): TranslationService { return Shell.Injector.get(TranslationService); }
  get Storage(): StorageService { return Shell.Injector.get(StorageService); }
  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit() {
    this.Translate.currentLanguage.subscribe(lang => this.lang = lang);
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
    this.Translate.setLanguage(lang);
    this.Storage.setItem('language', lang);
    console.log('language', this.Translate.lang);
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
