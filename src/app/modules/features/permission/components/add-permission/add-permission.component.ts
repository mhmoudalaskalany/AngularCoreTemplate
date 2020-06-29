import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from 'features/permission/services/permission.service';
import { Shell } from 'base/components/shell';
import { BaseEditComponent } from 'base/components/base-edit-component';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss']
})
export class AddPermissionComponent extends BaseEditComponent implements OnInit {

  get Service(): PermissionService { return Shell.Injector.get(PermissionService); }
  constructor(public route: ActivatedRoute) {
    super(route);
  }

}
