import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private appConfig;
  private configFile;

  constructor(private http: HttpClient) {
    this.getConfigFileName();
  }

  loadAppConfig() {
    console.log('environment' , environment.state);
    return this.http
      .get('/assets/config/' + this.configFile)
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }
  getConfigFileName(): void {
    if (environment.state === 'development') {
      this.configFile = 'development.json';
    }
    if (environment.state === 'production') {
      this.configFile = 'production.json';
    }
  }

  getServerUrl(): string {
    return this.appConfig.HOST_API;
  }
}
