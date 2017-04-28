import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';

import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnChanges {

  @Input() employeeSorted : string;
  @Input() employeeDeleted : Employee;
  @Input() employeeSaved : Employee;
  @Output() employeeSelect = new EventEmitter();
  @Output() employeeCreate = new EventEmitter();

  employeeSelected : any;
  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.get().then((employees) => {
      this.employees = employees;
      console.log(this.employees);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.employeeDeleted == undefined && this.employeeSaved == undefined){
      this.employeeService.getAllSortByLastName(changes.employeeSorted.currentValue).then(employees => this.employees = employees);
    }else if(this.employeeDeleted!=undefined){
      this.employeeService.delete(this.employeeDeleted)
      .then(() => {
        this.employeeService.get().then(employees => this.employees = employees);
        this.employeeDeleted = undefined;
      });
    }else if(this.employeeSaved!=undefined){
      if(this.employeeSaved._links==undefined){
        this.employeeService.create(this.employeeSaved)
        .then(employeeResult => {
          this.employeeService.get().then(employees => this.employees = employees);
          this.employeeSaved= undefined;
        });
      }else{
        this.employeeService.update(this.employeeSaved)
        .then(employeeResult=>{
          this.employeeService.get().then(employees => this.employees = employees);
          this.employeeSaved= undefined;
        });
      }
    }
    this.employeeSelect.emit(undefined);
  }


  onEmployeeSelect(employee){
    console.log("second");
    console.log(employee);

    this.employeeSelected = employee;
    this.employeeSelect.emit(employee);
  }

  onEmployeeCreate(){
    this.employeeCreate.emit("reset");
    this.employeeSelected = undefined;
  }

}
