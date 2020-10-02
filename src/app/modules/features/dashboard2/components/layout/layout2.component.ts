import { Component, OnInit } from '@angular/core';
import { Dashboard2Service } from 'features/dashboard2/services/dashboard2.service';
import { TranslationService } from 'core/services/localization/translation.service';

@Component({
  selector: 'app-layout2',
  templateUrl: './layout2.component.html',
  styleUrls: ['./layout2.component.scss']
})
export class Layout2Component implements OnInit {

  lang;
  constructor(private dashboardService: Dashboard2Service, private translation: TranslationService) { }

  ngOnInit() {
    this.translation.currentLanguage.subscribe(lang => this.lang = lang);
  }

}
