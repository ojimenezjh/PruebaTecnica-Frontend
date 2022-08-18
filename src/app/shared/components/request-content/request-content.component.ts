import { Component, Input, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { RequestsService, UserAuthService } from '../../services';

@Component({
  selector: 'app-request-content',
  templateUrl: './request-content.component.html',
  styleUrls: ['./request-content.component.scss']
})
export class RequestContentComponent implements OnInit {

  @Input() request: any;
  @Input() type: string = '';
 
  isPopupVisible: boolean = false;
  colCountByScreen: object;
  loading = false;
  formData: any = {};
  accepted: any;
  canAccept: boolean;

  constructor(private requestService: RequestsService, private userAuthService: UserAuthService) {
    this.canAccept = this.userAuthService.roleMatch('Responsable RRHH');
    this.colCountByScreen = {
      xs: 1,
      sm: 1,
      md: 1,
      lg: 4
    };
   }

  ngOnInit(): void {
    
  }

  async onSubmit(acceptedValue: boolean) {

    const {id} = this.request;
    let result: any;
    this.loading = true;

    if (this.type === 'Solicitud personalitzada') {
       result = await this.requestService.putCustomRequests(id, acceptedValue)
    } 
    else if (this.type === 'Solicitud de remuneració') {
      result = await this.requestService.putSalaryRequests(id, acceptedValue)
    } 
    else if (this.type === 'Solicitud de vacances'){
      result = await this.requestService.putVacationRequests(id, acceptedValue);
    }
      result.data.subscribe(
      (response: any) => {
        console.log(response.body);
        this.isPopupVisible = false;
        this.loading = false;
      },
      this.isPopupVisible = false
    );
  };

  popUpVisibility(){
    this.formData = this.request;
    if(this.request && !this.isPopupVisible){
      this.accepted = this.request.accepted;
      return this.isPopupVisible = true;
    } 
    else {
      notify('Has de seleccionar una solicitud','error',2000);
      return this.isPopupVisible = false;
    } 
  }

  requestManagerUsername(){
    if(this.request){
      const {username_manager} = this.request;
      return "Responsable a cárrec amb usuari: " + username_manager;
    } return;
  }

  requestTitle(){
    if(this.request){
      const {id_employee, name_employee, surnames_employee} = this.request;
      return this.type + " per l'empleat "+id_employee+': '+name_employee+' '+surnames_employee;
    } return;
  };
}

