import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'core/services/localization/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private translateService: TranslationService) {
  }

  ngOnInit(): void {
    console.log('current language at home', this.translateService.getCurrentLanguage());
  }
  setLanguage(lang: string): void {
    this.translateService.setLanguage(lang);
  }

}
