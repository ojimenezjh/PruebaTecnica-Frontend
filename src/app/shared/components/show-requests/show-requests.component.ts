import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-requests',
  templateUrl: './show-requests.component.html',
  styleUrls: ['./show-requests.component.scss']
})
export class ShowRequestsComponent implements OnInit {

  @Input() dataSource: any;
  @Input() type: string = '';

  request: any;

  constructor() 
  {}
  ngOnInit(): void {}

  onRowClick(e:any){
    this.request = e.data;
    console.log(this.request);
  }

}
