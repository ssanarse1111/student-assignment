import { Injectable } from '@angular/core';
import { Select } from '../interfaces/Select';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  genders: Select[] = [
    { id: 1, label: 'Male', value: 'Male' },
    { id: 2, label: 'Female', value: 'Female' },
    { id: 3, label: 'Other', value: 'Other' },
  ];

  state: Select[] = [
    { id: 1, label: 'Maharashtra', value: 'Maharashtra' },
    { id: 2, label: 'Gujarat', value: 'Gujarat' },
    { id: 3, label: 'Punjab', value: 'Punjab' },
  ];

  constructor() { }

  getGenders() {
    return this.genders;
  }

  getStates() {
    return this.state;
  }

}
