import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: "root"
  })
  export class StateService {
    employeesState$ = new BehaviorSubject<any>(null);
    customRequestsState$ = new BehaviorSubject<any>(null);
    salaryRequestsState$ = new BehaviorSubject<any>(null);
    vacationRequestsState$ = new BehaviorSubject<any>(null);
  }