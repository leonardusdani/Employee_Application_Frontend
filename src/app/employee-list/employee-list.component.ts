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
  @Output() employeeCounter = new EventEmitter();


  employeeSelected : any;
  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.get().then((employees) => {
      this.employees = <Employee[]>employees;
      this.employeeCounter.emit(this.employees.length);
      this.employees = this.employees.sort((a, b) => {
      if (a.lastName < b.lastName) return -1;
      else if (a.lastName > b.lastName) return 1;
      else return 0;});
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.employeeDeleted == undefined && this.employeeSaved == undefined && this.employees!=undefined){
      //this.employeeService.getAllSortByLastName(changes.employeeSorted.currentValue).then(employees => this.employees = employees);
      console.log(this.employeeSorted);
      if(this.employeeSorted=="asc"){
        this.employees = this.employees.sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        else if (a.lastName > b.lastName) return 1;
        else return 0;});
      }else{
        this.employees = this.employees.sort((a, b) => {
        if (a.lastName > b.lastName) return -1;
        else if (a.lastName < b.lastName) return 1;
        else return 0;});
      }
    }else if(this.employeeDeleted!=undefined){
      this.employeeService.delete(this.employeeDeleted)
      .then(() => {
        this.employeeService.get().then(employees => this.employees = employees);
        this.employeeCounter.emit(this.employees.length);
        this.employeeDeleted = undefined;
      });
    }else if(this.employeeSaved!=undefined){
      if(this.employeeSaved._links==undefined){
        this.employeeService.create(this.employeeSaved)
        .then(employeeResult => {
          this.employeeService.get().then(employees => this.employees = employees);
          this.employeeCounter.emit(this.employees.length);
          this.employeeSaved= undefined;
        });
      }else{
        this.employeeService.updateLocation(this.employeeSaved._links.location.href,this.employeeSaved.location).then(res=>{console.log(res)});
        this.employeeService.update(this.employeeSaved)
        .then(employeeResult=>{
          this.employeeService.get().then(employees => this.employees = employees);
          this.employeeCounter.emit(this.employees.length);
          this.employeeSaved= undefined;
        });
      }
    }
    this.employeeSelect.emit(undefined);
  }


  onEmployeeSelect(employee){
    this.employeeSelected = employee;
    this.employeeSelect.emit(employee);
  }

  onEmployeeCreate(){
    this.employeeCreate.emit("reset");
    this.employeeSelected = undefined;
  }

  onEmployeeSearch(keyword){
    console.log(keyword);
    this.employeeService.search(keyword).then(employees => this.employees = employees);
  }

  onEmployeeFilter(filter){
    if(!(filter.gender=="All" && filter.location=="All")){
      this.employees = this.employees.filter(employee=>{
        return (employee.gender==filter.gender && employee.location._links.location.href==filter.location);
      });
    }else if(filter.gender=="All"){
      this.employees = this.employees.filter(employee=>{
        return employee.location._links.location.href==filter.location;
      });
    }else if(filter.location=="All"){
      this.employees = this.employees.filter(employee=>{
        return employee.gender==filter.gender;
      });
    }
  }

}
