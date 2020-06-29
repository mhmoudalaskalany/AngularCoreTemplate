import { Component, OnInit, Input } from '@angular/core';
import { DataTableService } from './services/datatable.service';
import { Shell } from 'base/components/shell';
import { SortEvent } from 'primeng/api/sortevent';
import { ColumnsInterface } from './models/columns.interface';
import { URL } from './models/url';
import { take } from 'rxjs/operators';
import { AlertService } from 'core/services/alert/alert.service';
import { ConfigService } from 'core/services/config/config.service';
import { ActionsInterface } from './models/actions.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from './components/delete-modal.component';
import { Router } from '@angular/router';
import { TableOptions } from './models/tableOptions';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  // Inputs
  @Input() tableOptions: TableOptions = {};
  // private fields
  cols: ColumnsInterface[] = [];
  actions: ActionsInterface[] = [];
  url: URL = {};
  data: any[] = [];
  componentName: string;
  currentRoute;
  bsModalRef: BsModalRef;
  // services
  get Service(): DataTableService { return Shell.Injector.get(DataTableService); }
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  get Config(): ConfigService { return Shell.Injector.get(ConfigService); }
  get Modal(): BsModalService { return Shell.Injector.get(BsModalService); }
  get Router(): Router { return Shell.Injector.get(Router); }
  constructor() {
    this.currentRoute = this.Router.url.substring(0, this.Router.url.length - 3);
  }

  // initialization
  ngOnInit(): void {
    this.initializeInputs();
    this.loadDataFromServer();
  }
  initializeInputs(): void {
    // initialize url from config service
    this.url = {
      getAll: this.Config.getAppUrl('API')[this.tableOptions.inputUrl.getAll],
      delete: this.Config.getAppUrl('API')[this.tableOptions.inputUrl.delete]
    };
    // initialize columns
    this.cols = this.tableOptions.inputCols;
    this.actions = this.tableOptions.inputActions;
    this.componentName = this.tableOptions.inputName;
  }
  // load data from server
  loadDataFromServer(): void {
    this.Service.loadData(this.url.getAll).subscribe((res: any) => {
      console.log(res);
      this.data = res.result.data;
    });
  }

  // Delete
  openDeleteModal(id?: string): void {
    const initialState = {
      title: 'Delete Confirmation'
    };
    this.bsModalRef = this.Modal.show(DeleteModalComponent, { initialState });
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.delete(id);
      }
    });
  }
  delete(id: string): void {
    this.Service
      .delete(this.url.delete, id)
      .pipe(
        take(1)
      )
      .subscribe(x => {
        console.log(x);
        this.Alert.showError('Deleted Successfully');
        this.loadDataFromServer();
      }, error => {
        this.Alert.showError('Error Deleting');
      });
  }


  // Sort
  customSort(event: SortEvent) {
    console.log('sort event', event);
    // event.data = Data to sort
    // event.mode = 'single' or 'multiple' sort mode
    // event.field = Sort field in single sort
    // event.order = Sort order in single sort
    // event.multiSortMeta = SortMeta array in multiple sort

    event.data.sort((data1, data2) => {
      const value1 = data1[event.field];
      const value2 = data2[event.field];
      const result = null;
      return (event.order * result);
    });
  }

  // Filter
  filter(value?: any, column?: any): void {
    console.log('filter value', value);
    console.log('filter column', column);
  }

}
