import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'core/services/localization/translation.service';
import { AuthService } from 'core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private translateService: TranslationService
  ) {
  }

  ngOnInit(): void {
  }
  setLanguage(lang: string): void {
    this.translateService.setLanguage(lang);
  }
}
