import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setUser(object: any){
    localStorage.setItem('user', JSON.stringify(object))
  }

  public getUser(): object {
    return JSON.parse(localStorage.getItem('user') || '[]');
  }

  public setRoles(roles:[]){
    localStorage.setItem('roles', JSON.stringify(roles))
  }

  public getRoles(): []{
    return JSON.parse(localStorage.getItem('roles') || '[]');
  }

  public setToken(jwtToken: string){
    localStorage.setItem('jwtToken', JSON.stringify(jwtToken))
  }

  public getToken(): []{
    return JSON.parse(localStorage.getItem('jwtToken') || '[]');
  }

  public isloggedIn() {
    if ((this.getRoles() && this.getToken()).length !== 0) {
      return true;
    }
    else return false;
  }

  public roleMatch(roleToMatch: string){
    const roles: any = this.getRoles();
    let rolesIndex = [];
     for (let index = 0; index < roles.length; index++) {
       rolesIndex.push(roles[index].name);
     }
    return rolesIndex.includes(roleToMatch);
   }
}
