import { Component, OnInit } from '@angular/core';
import { AuthService } from 'core/services/auth/auth.service';
import { SessionManager } from 'core/services/guards/session-manager';
import { Shell } from 'base/components/shell';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  manager: SessionManager = SessionManager.Current();
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

   logout() {
     this.authService.logout();
  }

}
