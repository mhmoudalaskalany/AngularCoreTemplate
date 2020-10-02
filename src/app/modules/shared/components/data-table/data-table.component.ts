import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataTableService } from './services/datatable.service';
import { Shell } from 'base/components/shell';
import { SortEvent } from 'primeng/api/sortevent';
import { ColumnsInterface } from './models/columns.interface';
import { URL } from './models/url';
import { take, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { AlertService } from 'core/services/alert/alert.service';
import { ConfigService } from 'core/services/config/config.service';
import { ActionsInterface } from './models/actions.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from './components/delete-modal.component';
import { Router } from '@angular/router';
import { TableOptions } from './models/tableOptions';
import { TranslationService } from 'core/services/localization/translation.service';
import { Subject } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit , OnDestroy {

  // Inputs
  @Input() tableOptions: TableOptions = {};
  // private fields
  /* hold Columns Definitions */
  cols: ColumnsInterface[] = [];
  /* hold actions */
  actions: ActionsInterface[] = [];
  /* hold the urls fro get and delete */
  url: URL = {};
  /* hold the data */
  data: any[] = [];
  /* total count of records */
  totalCount = 0;
  /* hold the component name */
  componentName: string;
  /* hold the permissions */
  permissions: string[] = [];
  /* hold the current route */
  currentRoute;
  /* get reference to bootstrap modal */
  bsModalRef: BsModalRef;
  /* load data at first time */
  private firstInit: boolean;
  /* subscriber to unsubscribe when leaving the component */
  private destroy$: Subject<boolean> = new Subject<boolean>();
  // services
  get Service(): DataTableService { return Shell.Injector.get(DataTableService); }
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  get Config(): ConfigService { return Shell.Injector.get(ConfigService); }
  get Modal(): BsModalService { return Shell.Injector.get(BsModalService); }
  get Translate(): TranslationService { return Shell.Injector.get(TranslationService); }
  get Router(): Router { return Shell.Injector.get(Router); }
  constructor() {
    this.currentRoute = this.Router.url.substring(0, this.Router.url.length - 3);
  }

  // initialization
  ngOnInit(): void {
    this.initializeInputs();
    // this.loadDataFromServer();
    this.columnSearchInput();
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
      this.totalCount = res.totalCount;
    });
  }
  /* lazy load table data */
  /* note:  gets called on entering component */
  loadLazyLoadedData(event?: LazyLoadEvent): void {
    this.resetOpt();
    this.setSortColumn(event);
    this.setPaging(event);
    this.loadDataFromServer();
  }
  /* set SortColumn */
  setSortColumn(event?: LazyLoadEvent): void {
    this.Service.opt.orderByValue = [];
    this.Service.opt.orderByValue.push({ colId: event.sortField, sort: event.sortOrder === 1 ? 'asc' : 'desc' });
  }
  /* set paging parameters*/
  setPaging(event?: LazyLoadEvent): void {
    this.Service.opt.pageSize = event.rows;
    this.Service.opt.pageNumber = (event.first / event.rows) + 1;
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


  // Filter
  filter(value?: any, column?: any): void {
    this.resetOpt();
    this.Service.searchNew$.next(this.Service.opt.filter[column] = value);
  }
  /* get search value when typing on column search box */
  columnSearchInput(): void {
    this.Service.searchNew$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.firstInit ? this.loadDataFromServer() : (this.firstInit = true);
      });
  }
  /* when leaving the component */
  ngOnDestroy() {
    this.Service.searchNew$.next({});
    this.resetOpt();
    this.firstInit = false;
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /* reset server opt */
  resetOpt(): void {
    this.Service.opt = {
      pageNumber: 1,
      pageSize: 10,
      orderByValue: [{ colId: 'id', sort: 'asc' }],
      filter: {}
    };
  }

}
