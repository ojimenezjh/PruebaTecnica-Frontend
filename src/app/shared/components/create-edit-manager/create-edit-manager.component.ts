import { Component, Input, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { ValidationCallbackData } from 'devextreme/ui/validation_rules';
import { ManagersService } from '../../services';

@Component({
  selector: 'app-create-edit-manager',
  templateUrl: './create-edit-manager.component.html',
  styleUrls: ['./create-edit-manager.component.scss']
})
export class CreateEditManagerComponent implements OnInit {

  @Input() employee: any;
  formData: any = {};
  isPopupVisible: boolean = false;
  colCountByScreen: object;
  loading = false;

  constructor(private managersService: ManagersService) {
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

    const { id_employee, username, password } = this.formData;

    const body = {
      id_employee,
      username,
      password
    };

    this.loading = true;

      const result = await this.managersService.createManager(body);
      result.data.subscribe(
        (response: any) => {
          console.log(response.body);
          this.loading = false;
          return this.isPopupVisible = false;
        },
        (error: any) => { 
          notify(error, 'error', 2000);
          this.loading = false;
          return this.isPopupVisible = false;
        }
        );
    };

    confirmPassword = (e: ValidationCallbackData) => {
      return e.value === this.formData.password;
    }

  popUpVisibility(){
    if(this.employee && !this.isPopupVisible){
      this.formData.id_employee = this.employee.id;
      return this.isPopupVisible = true;
    } 
    else {
      notify('Has de seleccionar un empleat','error',2000);
      return this.isPopupVisible = false;
    } 
  }

  requestTitle(){
    if(this.employee){
      const {id, name, surnames} = this.employee;
      return 'Nou responsable '+name+' '+surnames;
    } return;
  };

}
