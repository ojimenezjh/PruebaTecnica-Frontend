import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { UserAuthService } from 'src/app/shared/services';
import { EmployeesService } from 'src/app/shared/services/employees.service';
import { StateService } from 'src/app/shared/services/state.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {


  @ViewChild('employeesGrid') employeesGrid!: DxDataGridComponent;

  dataSource: any;
  employee: any;
  manager: any;
  loading = false;
  rrhhRole = false;

  constructor(private userAuthService: UserAuthService, private stateService: StateService, private employeesService: EmployeesService)
  {
    this.rrhhRole = this.userAuthService.roleMatch('Responsable RRHH');
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  async getEmployees() {
    this.dataSource = this.stateService.employeesState$.getValue();

    if (!this.dataSource) {
      this.loading = true;
      this.manager = this.userAuthService.getUser();
         const managerDepartment  = this.manager.departments[0].name;
         
         const result = await this.userAuthService.roleMatch('Responsable RRHH') 
        ? await this.employeesService.getEmployees() 
        : await this.employeesService.getEmployeesByDepartment(managerDepartment)

      result.data.subscribe(
      (response: any) => {
        console.log(response.body);
        this.loading = false;
        this.dataSource = response.body;     
        this.stateService.employeesState$.next(this.dataSource);
      },
      (error) => console.error(error)
    );
    };
  }

  onRowClick(e:any){
    this.employee = e.data;
    console.log(this.employee);
    
  }

}

