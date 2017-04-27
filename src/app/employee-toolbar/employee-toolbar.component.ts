import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Employee } from '../employee';


@Component({
  selector: 'employee-toolbar',
  templateUrl: './employee-toolbar.component.html',
  styleUrls: ['./employee-toolbar.component.css']
})
export class EmployeeToolbarComponent implements OnInit {

  @Input() employee : any;
  @Output() employeeSorting = new EventEmitter();
  @Output() employeeDelete = new EventEmitter();

  employeeSorted = false;

  constructor() { }

  ngOnInit() { }

  onEmployeeSorting(){
    if(this.employeeSorted==true){
      this.employeeSorted = false;
      this.employeeSorting.emit("desc");
    }else{
      this.employeeSorted = true;
      this.employeeSorting.emit("asc");
    }
  }

  onEmployeeDelete(){
    this.employeeDelete.emit(this.employee);
  }

}
