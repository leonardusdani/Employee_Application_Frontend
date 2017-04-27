import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  exportAs: 'childPopup'
})
export class PopupComponent implements OnInit {
  
  @Output() employeeDelete = new EventEmitter();
  @ViewChild('childModal') public childModal:ModalDirective;

  employee : Employee;


  constructor(private employeeService:EmployeeService) { }

  ngOnInit() {
  }
 
  showChildModal(employee) {
    console.log(employee);
    this.employee = employee;
    this.childModal.show();
  }
 
  hideChildModal() {
    this.childModal.hide();
  }

  onEmployeeDelete(){
    this.employeeDelete.emit(this.employee);
    this.childModal.hide();
  }


  

  

}
