import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserAuthService, AppInfoService } from './';

@Injectable()
export class ManagersService {

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Hi ha hagut un problema, torni a provar més tard o posis en contacte amb el servei tècnic'));
  }

  constructor(public appInfo: AppInfoService, private userAuthService: UserAuthService, private router: Router, private httpClient: HttpClient) { }

  requestHeader = new HttpHeaders(
    { "Authorization": 'Bearer '+this.userAuthService.getToken() }
  )

  public getManagers() {
    return {
      data:
        this.httpClient.get(this.appInfo.apiUrl + '/managers/find', { headers: this.requestHeader, observe: 'response' })
          .pipe(
            catchError(this.handleError)
          ),
    };
  };

  public createManager(body: object) {
    return {
      data:
        this.httpClient.post(this.appInfo.apiUrl + '/managers/add/', body, { headers: this.requestHeader, observe: 'response' })
          .pipe(
            catchError(this.handleError)
          ),
    };
  }
}

