import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'base/components/base-list-component';
import { PermissionService } from 'features/permission/services/permission.service';
import { Shell } from 'base/components/shell';
import { SessionManager } from 'core/services/guards/session-manager';
import { TableOptions } from 'shared/components/data-table/models/tableOptions';

@Component({
  selector: 'app-all-permission',
  templateUrl: './all-permission.component.html',
  styleUrls: ['./all-permission.component.scss']
})
export class AllPermissionComponent extends BaseListComponent implements OnInit {

  // private fields
  permissions: string[];
  tableOptions: TableOptions = {
    inputUrl: {
      getAll: 'GET-PERMISSION',
      delete: 'DELETE-PERMISSION'
    }
  };
  manager: SessionManager = SessionManager.Current();
  // Services
  get Service(): PermissionService { return Shell.Injector.get(PermissionService); }
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initializeTableColumns();
    this.initializeTableActions();
    this.initializeTablePermissions();
  }

  initializeTableColumns(): void {
    this.tableOptions.inputCols = [
      {
        field: 'nameEn',
        header: 'EnglishName',
        sort: true,
        filterMode: 'text'
      },
      {
        field: 'nameAr',
        header: 'ArabicName',
        sort: true,
        filterMode: 'text'
      }

    ];

  }
  initializeTableActions(): void {
    this.tableOptions.inputActions = [{
      isEdit: true,
      name: 'Edit',
      icon: 'fas fa-edit'
    },
    {
      isDelete: true,
      name: 'Delete',
      icon: 'fas fa-trash-alt'
    }
    ];
  }
  initializeTablePermissions(): void {
    this.tableOptions.inputName = 'Permissions';
  }



}
