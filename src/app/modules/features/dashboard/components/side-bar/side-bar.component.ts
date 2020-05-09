import { Component, OnInit, Input } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  constructor(layout: LayoutComponent) { }

  ngOnInit() {
  }

}
