
import { Component, OnInit } from '@angular/core';
import { Dashboard2Service } from 'features/dashboard2/services/dashboard2.service';
import { TranslationService } from 'core/services/localization/translation.service';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.scss']
})
export class Navbar2Component implements OnInit {
  lang;
  constructor(
    private dashboardService: Dashboard2Service,
    private translateService: TranslationService
  ) { }
  isCollapsed = true;
  ngOnInit() {
    this.translateService.currentLanguage.subscribe(lang => this.lang = lang);
  }


  setLanguage(lang: string): void {
    this.lang = lang;
    this.translateService.setLanguage(lang);
    console.log('language', this.translateService.lang);
  }

}
