import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService, UserAuthService } from '../../services';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loading = false;
  formData: any = {};


  constructor(private authService: AuthService, private userAuthService: UserAuthService, private router: Router) { }


  async onSubmit(e: Event) {
    e.preventDefault();
    const { username, password } = this.formData;
    this.loading = true;
    
    const result = await this.authService.logIn(username, password);
      result.data.subscribe(
        (response: any) => {
          if (response.status == 200) {
            const { token } = response.body;
            const tokenParsed = this.parseJwt(token);

            const { id_manager, name, surnames, roles, departments } = tokenParsed; 

            const userData ={
              id_manager,
              username,
              name,
              surnames,
              roles,
              departments
            }

            console.log({userData});
            
            this.userAuthService.setToken(token);
            this.userAuthService.setRoles(roles);
            this.userAuthService.setUser(userData);

            this.router.navigate(['/']);
          }
        },
        (error) => {
          console.log(error);
          this.loading = false;
          notify(error,'error', 2000);
        }  
      )
  }

   parseJwt (token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };

  onCreateAccountClick = () => {
    this.router.navigate(['/create-account']);
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [ LoginFormComponent ],
  exports: [ LoginFormComponent ]
})
export class LoginFormModule { }
