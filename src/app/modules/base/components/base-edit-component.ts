import { OnInit, Directive } from '@angular/core';
import { HttpService } from 'core/services/http/http.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'core/services/alert/alert.service';
import { Shell } from './shell';
import { SessionManager } from 'core/services/guards/session-manager';
import { RoleData } from 'core/services/guards/models';


@Directive()
export abstract class BaseEditComponent implements OnInit {

  constructor(protected route: ActivatedRoute) {
   }
  model: any = {};
  isNew = true;
  id: string;
  manager: SessionManager = SessionManager.Current();
  abstract get Service(): HttpService;
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  get Route(): Router { return Shell.Injector.get(Router); }

  protected SubmitNew(): Observable<any> {
    return this.Service.postReq('Add', this.model);
  }
  protected SubmitUpdate(): Observable<any> {
    return this.Service.putReq('Update', this.model);
  }
  protected GetModelFromServer(id: any): Observable<any> {
    return this.Service.getHeaderReq('Get', id);
  }

  Submit(): void {
    console.log('model', this.model);
    if (this.isNew) {
      this.SubmitNew().subscribe((data: any) => {
        if (data.status !== 201) {
          this.Alert.showError(data.message);
          return false;
        }
        this.Alert.showSuccess('تم الاضافة بنجاح');
        this.Redirect();
      }, error => {
        this.Alert.showError('خطا ف الاضافة');
      });
    }
    else {
      this.SubmitUpdate().subscribe((data: any) => {
        this.Alert.showSuccess('تم التعديل بنجاح');
        this.Redirect();
      }, error => {
        this.Alert.showError('خطا ف التعديل');
      });
    }
  }

  getRouteParams() {
    this.route.params.subscribe((p: any) => {
      if (p.id != null && p.id !== undefined) {
        this.isNew = false;
        this.id = p.id;
        this.Get(this.id);
      }
    });
  }

  Redirect() {
    const currentRoute = this.Route.url;
    const index = currentRoute.lastIndexOf('/');
    const str = currentRoute.substring(0, index);
    this.Route.navigate([str]);
  }
  Get(id: any): void {
    this.GetModelFromServer(id).subscribe((res: any) => {
      console.log('model at edit mode', res);
      this.model = res.data;
    }, error => {
      this.Alert.showError('خطأ ف استرجاع البيانات من الخادم');
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.getRouteParams();
  }



}
