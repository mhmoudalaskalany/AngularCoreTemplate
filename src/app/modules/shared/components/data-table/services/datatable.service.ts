import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadOptions } from '../models/LoadOpts';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  opt: LoadOptions = {
    pageNumber: 1,
    pageSize: 10,
    orderByValue: [{ colId: 'id', sort: 'asc' }],
    filter: {}
  };
  constructor(private http: HttpClient) { }

  loadData(url?: string): Observable<any> {
    return this.http.post(url, this.opt);
  }

  delete(url?: any, id?: string): Observable<any> {
    return this.http.delete(url + '/' + id);
  }
}
