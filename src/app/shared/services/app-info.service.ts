import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Persones i cultura';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }

  public get apiUrl() {
    return 'https://pic-rrhh.herokuapp.com/api/v1';
  }
}
