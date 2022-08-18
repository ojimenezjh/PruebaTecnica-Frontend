import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserAuthService, AppInfoService } from './';

@Injectable()
export class RequestsService {

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
  );

  public putCustomRequests(id: number, acceptedValue: boolean) {
    return {
      data:
        this.httpClient.put(this.appInfo.apiUrl + `/requests/updateCustom/${id}/${acceptedValue}`, {}, { headers: this.requestHeader, observe: 'response' })
          .pipe(
            catchError(this.handleError)
          ),
    };
  };

  public putSalaryRequests(id: number, acceptedValue: boolean) {
    return {
      data:
        this.httpClient.put(this.appInfo.apiUrl + `/requests/updateSalary/${id}/${acceptedValue}`, {}, { headers: this.requestHeader, observe: 'response' })
          .pipe(
            catchError(this.handleError)
          ),
    };
  };

  public putVacationRequests(id: number, acceptedValue: boolean) {
    return {
      data:
        this.httpClient.put(this.appInfo.apiUrl + `/requests/updateVacation/${id}/${acceptedValue}`, {}, { headers: this.requestHeader, observe: 'response' })
          .pipe(
            catchError(this.handleError)
          ),
    };
  };

  public postCustomRequests(body: any) {
    return {
      data:
        this.httpClient.post(this.appInfo.apiUrl + '/requests/addCustom', body, { headers: this.requestHeader, observe: 'response' })
          .pipe(
            catchError(this.handleError)
          ),
    };
  };

  public postSalaryRequests(body: any) {
    return {
      data:
        this.httpClient.post(this.appInfo.apiUrl + '/requests/addSalary', body, { headers: this.requestHeader, observe: 'response' })
          .pipe(
            catchError(this.handleError)
          ),
    };
  };

  public postVacationRequests(body: any) {
    return {
      data:
        this.httpClient.post(this.appInfo.apiUrl + '/requests/addVacation', body, { headers: this.requestHeader, observe: 'response' })
          .pipe(
            catchError(this.handleError)
          ),
    };
  };

  public getCustomRequests() {
    return {
      data:
        this.httpClient.get(this.appInfo.apiUrl + '/requests/findCustom', { headers: this.requestHeader, observe: 'response' })
          .pipe(
            catchError(this.handleError)
          ),
    };
  };

  public getSalaryRequests() {
    return {
      data:
        this.httpClient.get(this.appInfo.apiUrl + '/requests/findSalary', { headers: this.requestHeader, observe: 'response' })
          .pipe(
            catchError(this.handleError)
          ),
    };
  };

  public getVacationRequests() {
    return {
      data:
        this.httpClient.get(this.appInfo.apiUrl + '/requests/findVacation', { headers: this.requestHeader, observe: 'response' })
          .pipe(
            catchError(this.handleError)
          ),
    };
  };

  public getCustomRequestsByDepartment(department: string) {
    return {
      data:
        this.httpClient.get(this.appInfo.apiUrl + `/requests/findCustomDepartment/${department}`, { headers: this.requestHeader, observe: 'response' })
          .pipe(
            catchError(this.handleError)
          ),
    };
  };

  public getSalaryRequestsByDepartment(department: string) {
    return {
      data:
        this.httpClient.get(this.appInfo.apiUrl + `/requests/findSalaryDepartment/${department}`, { headers: this.requestHeader, observe: 'response' })
          .pipe(
            catchError(this.handleError)
          ),
    };
  };

  public getVacationRequestsByDepartment(department: string) {
    return {
      data:
        this.httpClient.get(this.appInfo.apiUrl + `/requests/findVacationDepartment/${department}`, { headers: this.requestHeader, observe: 'response' })
          .pipe(
            catchError(this.handleError)
          ),
    };
  };
}

