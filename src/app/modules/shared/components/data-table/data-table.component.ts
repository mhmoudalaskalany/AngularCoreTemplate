import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Observable, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoadOptions } from './models/LoadOptions';
import { Result } from './models/Result';
import { DeleteDialog } from './Delete-dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [DatePipe]
})
export class DataTableComponent implements OnInit {
  //receive the observable as a paramterized function to pass the filter object to it
  @Input() dataService: (x: LoadOptions) => Observable<Result>;
  @Input() columnHeader;
  @Input() columnTypes;
  @Output() deleteClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() viewClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() printClick: EventEmitter<string> = new EventEmitter<string>();
  @Input() reload: EventEmitter<any> = new EventEmitter<any>();


  localList: any[] = [];
  listCount: number = 0;
  objectKeys = Object.keys;
  //todo 
  //initialize this array with edit delete and view buttons and pass a key in the passed array of columns to view each one
  columns: string[];
  currentRoute;
  displayedColumns: string[];
  //to control show or hide buttons
  containView: boolean;
  containEdit: boolean;
  containDelete: boolean;
  caontainPrint: boolean;

  dateKey: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: Router, public dialog: MatDialog, private datePipe: DatePipe) {
    this.currentRoute = this.route.url.substring(0, this.route.url.length - 3);
  }
  ngOnInit() {
    this.getColumnTypes(this.columnTypes);
    this.columns = this.objectKeys(this.columnHeader);
    if (this.columns.includes('view')) {
      this.containDelete = false;
      this.containEdit = false;
      this.containView = true;
      //remove view column from array and concat it like edit and delete *don't know why it crash*
      this.columns.shift();
      this.displayedColumns = this.columns.concat(['view']);
    }
    else if(this.columns.includes('print')) {
      this.containEdit = true;
      this.containDelete = true;
      this.caontainPrint = true;
      this.containView = false;
      this.columns.shift();
      this.displayedColumns = this.columns.concat(['print','edit','delete']);

    }
    else {
      this.containView = false;
      this.caontainPrint = false;
      this.containDelete = true;
      this.containEdit = true;
      this.displayedColumns = this.columns.concat(['edit', 'delete']);
    }

  }
  ngAfterViewInit() {
    this.RenderTable();
  }

  delete(id) {
    this.openDeleteDialog(id);
  }

  print(element) {
    this.printClick.emit(element);
  }

  openDialog(element) {
    this.viewClick.emit(element);
  }
  RenderTable() {
    //listen on sorting or pagination event
    merge(this.sort.sortChange, this.paginator.page, this.reload).pipe(
      switchMap(d => {
        //pass filter paging and sorting object to the dataservice input which takes this object
        return this.dataService({
          pageNumber: this.paginator.pageIndex + 1,
          pageSize: this.paginator.pageSize,
          orderByValue: [{
            //if sort is not exist select default column
            colId: (this.sort.active) ? this.sort.active : "id",
            sort: this.sort.direction
          }],
          filter: {}
        });
      })).subscribe(e => {
        //after that bind the data to the offline data list
        this.listCount = e.totalPage;
        this.localList = e.result.data;
        console.log(e);
        if (this.dateKey != '' || this.dateKey != undefined) {
          for (var i = 0; i < this.localList.length; i++) {
            this.localList[i][this.dateKey] = this.datePipe.transform(this.localList[i][this.dateKey], 'yyyy-MM-dd');
          }
        }

      });



  }
  openDeleteDialog(id): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '250px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == null || result == undefined)
        return;
      console.log(result);
      this.deleteClick.emit(result.data.id);
    });
  }

  //get the column which has data type of date
  getColumnTypes(columnTypes?): void {
    if (columnTypes != null || columnTypes != undefined) {
      var dateKey;
      Object.keys(columnTypes).forEach((key => {
        if (columnTypes[key] == 'Date')
          dateKey = key
      }));

      this.dateKey = dateKey;
    }

  }

}
