import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { RequestsService, StateService, UserAuthService } from 'src/app/shared/services/';

@Component({
  selector: 'app-custom-requests',
  templateUrl: './custom-requests.component.html',
  styleUrls: ['./custom-requests.component.scss']
})
export class CustomRequestsComponent implements OnInit {

  dataSource: any;
  request: any;
  loading = false;
  managerData: any;
  type: string;

  constructor(private userAuthService: UserAuthService, private requestsService: RequestsService, private stateService: StateService) 
  {
    this.type = 'Solicitud personalitzada'
  }
  
  ngOnInit(): void {
    this.getRequests();
  }

  async getRequests() {
    this.dataSource = this.stateService.customRequestsState$.getValue();

    if (!this.dataSource) {
    this.loading = true;
         this.managerData = this.userAuthService.getUser();
         const managerDepartment  = this.managerData.departments[0].name;
         const result = await this.userAuthService.roleMatch('Responsable RRHH') 
        ? await this.requestsService.getCustomRequests() 
        : await this.requestsService.getCustomRequestsByDepartment(managerDepartment);
        result.data.subscribe(
        (response: any) => {
          this.loading = false;
          this.dataSource = response.body;
          this.stateService.customRequestsState$.next(this.dataSource);
        },
        (error: any) => { 
          console.error(error); notify(error, 'error' ,2000);
          this.loading = false;
        }
    );
  };
};
}
