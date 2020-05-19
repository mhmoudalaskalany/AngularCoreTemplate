import { Component, Injector } from '@angular/core';
import { Shell } from 'base/components/shell';
import { TranslationService } from 'core/services/localization/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularGridCoreTemplate';
  constructor(public inj: Injector , private translateService: TranslationService) {
    Shell.Injector = inj;
    this.translateService.setDefaultLanguage();
  }
}
