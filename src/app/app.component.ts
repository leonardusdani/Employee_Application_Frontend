import { Component, ViewChild } from '@angular/core';

import { Employee } from './employee';
import {EmployeeFormComponent} from './employee-form/employee-form.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(EmployeeFormComponent) employeeForm: EmployeeFormComponent;

  employeeSelected : any;
  employeeSorted : string;
  employeeDeleted : Employee;
  employeeSaved : Employee;

  onEmployeeSelect(employee){
    this.employeeSelected = employee;
  }

  onEmployeeSorting(sorting){
    this.employeeSorted = sorting;
    this.employeeSelected = undefined;
  }
  onEmployeeDelete(employee){
    this.employeeDeleted = employee;
    this.employeeSelected = undefined;
  }

  onEmployeeCreate(creating){
    this.employeeSelected = undefined;
    this.employeeForm.initializeForm();
  }

  onEmployeeSave(employee){
    this.employeeSaved = employee;
    this.employeeSelected = undefined;
    this.employeeForm.initializeForm();
  }

}
