import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService, UserAuthService } from '../../services';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  managerData: any;

  userMenuItems: any = [];

  constructor(private authService: AuthService, private userAuthService: UserAuthService , private router: Router) { }

  ngOnInit() {
    this.managerData = this.userAuthService.getUser();
    console.log(this.managerData);
    this.createUserMenu();
  }

  createUserMenu(){
    for (let index = 0; index < this.managerData.roles.length; index++) {
      console.log(this.managerData.roles[index].name);
      
    this.userMenuItems.push(
      {
        text: this.managerData.roles[index].name,
        icon: 'user',   
      });
    };
    this.userMenuItems.push(
      {
        text: 'Tanca la sessió',
        icon: 'runner',
        onClick: () => {
          this.authService.logOut();
        }
      }
    )

  }
  

  toggleMenu = () => {
    this.menuToggle.emit();
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule
  ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
