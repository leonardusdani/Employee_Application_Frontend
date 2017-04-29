import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


import { ModalDirective } from 'ngx-bootstrap/modal';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import {Location} from '../location';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  exportAs: 'childPopup'
})
export class PopupComponent implements OnInit {

  form : FormGroup;
  
  @Output() employeeDelete = new EventEmitter();
  @Output() employeeFilter = new EventEmitter();

  @ViewChild('childModal') public childModal:ModalDirective;
  @ViewChild('childModalFilter') public childModalFilter:ModalDirective;

  employee : Employee;

  locations: Location[];

  constructor(private employeeService:EmployeeService,private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  showFilterChildModal(){
    this.childModalFilter.show();
  }

  hideChildFilterModal() {
    this.childModalFilter.hide();
  }
 
  showChildModal(employee) {
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

  initializeForm(){   
        this.form = this.formBuilder.group({
        gender: this.formBuilder.control(''),
        location: this.formBuilder.control('')
      });
      this.employeeService.getLocations().then(locations => {
        this.locations = locations;
        this.setDefaultValue();
      });
      
    }

    setDefaultValue(){
    this.form.controls['location'].setValue(this.locations[0]._links.location.href);
    this.form.controls['gender'].setValue("Male");
  }

  onSubmit(filter){
    this.employeeFilter.emit(filter);
    this.childModalFilter.hide();
  }
  

  

}
