import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './shared/components';
import { ProfileComponent } from './pages/profile/profile.component';
import { DxButtonModule, DxDataGridModule, DxDateBoxModule, DxFormModule, DxLoadIndicatorModule, DxPopupModule, DxScrollViewModule, DxTextAreaModule } from 'devextreme-angular';
import { SalaryRequestsComponent } from './pages/requests/salary-requests/salary-requests.component';
import { VacationRequestsComponent } from './pages/requests/vacation-requests/vacation-requests.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { EmployeesComponent } from './pages/employees/employees.component';
import { ManagersComponent } from './pages/managers/managers.component';
import { CreateEditRequestComponent } from './shared/components/create-edit-request/create-edit-request.component';
import { ShowRequestsComponent } from './shared/components/show-requests/show-requests.component';
import { CustomRequestsComponent } from './pages/requests/custom-requests/custom-requests.component';
import { CommonModule } from '@angular/common';
import { RequestContentComponent } from './shared/components/request-content/request-content.component';
import { CreateEditManagerComponent } from './shared/components/create-edit-manager/create-edit-manager.component';

const routes: Routes = [
   {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'managers',
    component: ManagersComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'custom-requests',
    component: CustomRequestsComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'salary-requests',
    component: SalaryRequestsComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'vacation-requests',
    component: VacationRequestsComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: '**',
    redirectTo: 'employees'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxScrollViewModule, DxDateBoxModule, CommonModule, DxLoadIndicatorModule ,DxDataGridModule, DxFormModule, DxButtonModule, DxPopupModule, DxTextAreaModule],
  providers: [AuthGuard],
  exports: [RouterModule],
  declarations: [
    ProfileComponent,
    EmployeesComponent,
    ManagersComponent,
    CustomRequestsComponent,
    VacationRequestsComponent,
    SalaryRequestsComponent,
    CreateEditRequestComponent,
    CreateEditManagerComponent,
    ShowRequestsComponent,
    RequestContentComponent
  ]
})
export class AppRoutingModule { }
