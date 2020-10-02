import { Component, OnInit } from '@angular/core';
import { AuthService } from 'core/services/auth/auth.service';
import { SessionManager } from 'core/services/guards/session-manager';
import { Shell } from 'base/components/shell';

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.scss']
})
export class Sidebar2Component implements OnInit {
  display = true;
  manager: SessionManager = SessionManager.Current();
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
