import { Component, ViewChild } from '@angular/core';

import { Employee } from './employee';
import {EmployeeFormComponent} from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(EmployeeFormComponent) employeeForm: EmployeeFormComponent;
  @ViewChild(EmployeeListComponent) employeeList: EmployeeListComponent

  employeeSelected : any;
  employeeSorted : string;
  employeeDeleted : Employee;
  employeeSaved : Employee;
  employeeCounter : any;

  onEmployeeCounter(counter){
    this.employeeCounter = counter;
  }

  onEmployeeSelect(employee){
    this.employeeSelected = employee;
  }

  onEmployeeSorting(sorting){
    this.employeeSorted = sorting;
    this.employeeSelected = undefined;
  }
  onEmployeeDelete(employee){
    //this.employeeDeleted = employee;
    this.employeeList.onEmployeeDelete(employee);
    this.employeeSelected = undefined;
    this.employeeForm.initializeForm();
  }

  onEmployeeCreate(creating){
    this.employeeSelected = undefined;
    this.employeeForm.initializeForm();
  }

  onEmployeeSave(employee){
    this.employeeList.onEmployeeSave(employee);
    this.employeeSelected = undefined;
    this.employeeForm.initializeForm();
  }

  onEmployeeFilter(filter){
    this.employeeList.onEmployeeFilter(filter);
  }

  onEmployeeSearch(keyword){
    this.employeeList.onEmployeeSearch(keyword);
  }


}
