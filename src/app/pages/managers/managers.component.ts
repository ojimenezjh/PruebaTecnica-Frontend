import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { UserAuthService } from 'src/app/shared/services';
import { ManagersService } from 'src/app/shared/services/managers.service';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.scss']
})
export class ManagersComponent implements OnInit {

  @ViewChild('managersGrid') managersGrid!: DxDataGridComponent;

  dataSource: any;
  employee: any;
  manager: any;
  loading = false;

  constructor(private userAuthService: UserAuthService, private managersService: ManagersService) 
  {}
  ngOnInit(): void {
    this.getManagers();
  }

  async getManagers() {
    if (!this.dataSource) {
      this.loading = true;
      this.manager = this.userAuthService.getUser();
       
      const result = await this.managersService.getManagers();
      result.data.subscribe(
      (response: any) => {
        console.log(response.body);
        this.loading = false;
        this.dataSource = response.body;     
      },
      (error: any) => console.error(error)
    );
    };
  }

  onRowClick(e:any){
    this.employee = e.data;
    console.log(this.employee);
    
  }

}
