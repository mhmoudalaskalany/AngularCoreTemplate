
import { OnInit, ViewChild, Output, EventEmitter, Directive } from '@angular/core';
import { HttpService } from 'core/services/http/http.service';
import { Observable } from 'rxjs';
import { AlertService } from 'core/services/alert/alert.service';
import { Shell } from './shell';
import { Router } from '@angular/router';




@Directive()
export abstract class BaseListComponent implements OnInit {

    constructor() { }

    abstract get Service(): HttpService;

    get Alert(): AlertService { return Shell.Injector.get(AlertService); }
    get Route(): Router { return Shell.Injector.get(Router); }


    ngOnInit(): void {
    }

    Redirect() {
        const currentRoute = this.Route.url;
        const index = currentRoute.lastIndexOf('/');
        const str = currentRoute.substring(0, index);
        this.Route.navigate([str]);
    }


}
