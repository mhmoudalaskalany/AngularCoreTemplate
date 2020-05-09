import { SortModel } from './SortModel';
export class LoadOptions {
  pageSize: number = 0;
  pageNumber: number = 0;
  searchCriteria?:string = ''
  orderByValue?: SortModel[] = [];
  filter:any ={};
}
