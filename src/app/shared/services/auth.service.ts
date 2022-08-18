import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserAuthService, AppInfoService } from './';

export interface IUser {
  username: string;
}

const requestHeader = new HttpHeaders(
  { "No-Auth": "True" }
)

@Injectable()
export class AuthService {

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
    return throwError(() => new Error('Autenticació incorrecte, revisi credencials o torni a provar'));
  }

  constructor(public appInfo: AppInfoService, private userAuthService: UserAuthService, private router: Router, private httpClient: HttpClient) { }

  public logIn(username: string, password: string) {
    const body = { username, password }
    return {
      data:
        this.httpClient.post(this.appInfo.apiUrl.replace('/api/v1','') + '/authenticate', body, { headers: requestHeader, observe: 'response' })
          .pipe(
            catchError(this.handleError)
          ),
    };
  }

  public logOut() {
    localStorage.clear();
    this.router.navigate(['/login-form']);
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: { username: '' }
      };
    }
    catch {
      return {
        isOk: false,
        data: null
      };
    }
  }

  async createAccount(username: string, password: string) {
    try {
      // Send request
      console.log(username, password);

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(username: string, recoveryCode: string) {
    try {
      // Send request
      console.log(username, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    };
  }

  async resetPassword(username: string) {
    try {
      // Send request
      console.log(username);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }
}

