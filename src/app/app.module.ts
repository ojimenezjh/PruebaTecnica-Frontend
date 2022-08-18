import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ManagersComponent } from './pages/managers/managers.component';
import { EmployeesService } from './shared/services/employees.service';
import { CreateEditRequestComponent } from './shared/components/create-edit-request/create-edit-request.component';
import { RequestsService } from './shared/services/requests.service';
import { ShowRequestsComponent } from './shared/components/show-requests/show-requests.component';
import { ManagersService } from './shared/services/managers.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    EmployeesService,
    RequestsService,
    ManagersService,
    CreateEditRequestComponent,
    ShowRequestsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
