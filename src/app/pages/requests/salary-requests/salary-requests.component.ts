import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { StateService, UserAuthService } from 'src/app/shared/services';
import { RequestsService } from 'src/app/shared/services/requests.service';

@Component({
  selector: 'app-salary-requests',
  templateUrl: './salary-requests.component.html',
  styleUrls: ['./salary-requests.component.scss']
})
export class SalaryRequestsComponent implements OnInit {

  dataSource: any;
  request: any;
  loading = false;
  managerData: any;
  type: string;

  constructor(private userAuthService: UserAuthService, private requestsService: RequestsService, private stateService: StateService) 
  {
    this.type = 'Solicitud de remuneració'
  }
  
  ngOnInit(): void {
    this.getRequests();
  }

  async getRequests() {
    this.dataSource = this.stateService.salaryRequestsState$.getValue();

    if (!this.dataSource) {
    this.loading = true;
         this.managerData = this.userAuthService.getUser();
         const managerDepartment  = this.managerData.departments[0].name;
         
         const result = await this.userAuthService.roleMatch('Responsable RRHH') 
        ? await this.requestsService.getSalaryRequests() 
        : await this.requestsService.getSalaryRequestsByDepartment(managerDepartment)

        result.data.subscribe(
        (response: any) => {
          this.loading = false;
          this.dataSource = response.body;
          this.stateService.salaryRequestsState$.next(this.dataSource);
        },
        (error: any) => { 
          console.error(error); notify(error, 'error' ,2000);
          this.loading = false; 
        }
    );
  };
};
}
