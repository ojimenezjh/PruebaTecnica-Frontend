import { Component, Input, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { RequestsService } from '../../services';

@Component({
  selector: 'app-create-edit-request',
  templateUrl: './create-edit-request.component.html',
  styleUrls: ['./create-edit-request.component.scss']
})
export class CreateEditRequestComponent implements OnInit {

  @Input() employee: any;
  @Input() manager: any;
  formData: any = {};
  isPopupVisible: boolean = false;
  colCountByScreen: object;
  type: string = '';
  loading = false;

  constructor(private requestService: RequestsService) {
    this.colCountByScreen = {
      xs: 1,
      sm: 1,
      md: 1,
      lg: 4
    };
   }

  ngOnInit(): void {}

  async onSubmit(e: Event) {
    e.preventDefault();

    console.log('dd',this.manager);
    

    let result: any;

    const { note } = this.formData;
    const id_employee = this.employee.id;
    const id_manager = this.manager.id_manager;

    const body = {
      id_manager,
      id_employee,
      note
    };

    this.loading = true;

    if (this.type === 'Solicitud personalitzada') {
      const customRequestBody ={
        ...body,
      }
       result = await this.requestService.postCustomRequests(customRequestBody)
    } 
    else if (this.type === 'Solicitud de remuneració') {
      const { new_salary } = this.formData;
      const salaryRequestbody = {
        ...body,
        new_salary
      };
      console.log(salaryRequestbody);
      
      result = await this.requestService.postSalaryRequests(salaryRequestbody)
    } 
    else if (this.type === 'Solicitud de vacances'){
      const { start_date, finish_date } = this.formData;
      const vacationRequestBody = {
        ...body,
        start_date,
        finish_date
      };
      result = await this.requestService.postVacationRequests(vacationRequestBody);
    }
      result.data.subscribe(
      (response: any) => {
        console.log(response.status);
        this.loading = false;
        return this.isPopupVisible = false;
      },
      (error: any) => { 
        console.error(error); notify(error, 'error' ,2000);
        this.loading = false;
        return this.isPopupVisible = false; 
      }
      );
  };

  popUpVisibility(e: Event){
    if(this.employee && !this.isPopupVisible){
      this.popUpType(e);
      return this.isPopupVisible = true;
    } 
    else {
      notify('Has de seleccionar un empleat','error',2000);
      return this.isPopupVisible = false;
    } 
  }

  popUpType(e: any){
    this.type = e.component._elementAttr.text;
  }

  requestTitle(){
    if(this.employee){
      const {id, name, surnames} = this.employee;
      return this.type + " per a l'empleat "+id+': '+name+' '+surnames;
    } return;
  };
}

