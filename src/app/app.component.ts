import { Component, Injector } from '@angular/core';
import { Shell } from 'base/components/shell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularGridCoreTemplate';
  constructor(public inj: Injector) {
    Shell.Injector = inj;
  }
}
