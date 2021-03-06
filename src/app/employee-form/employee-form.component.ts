import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Employee } from '../employee'
import { EmployeeService } from '../employee.service';

import { DomSanitizer } from '@angular/platform-browser';

import { Http, Headers ,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Location} from '../location';

@Component({
  selector: 'employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit, OnChanges {
  form : FormGroup;
  
  imageUrl : string;
  imageFile : File;
  imageUrlTemp: any;
  imageName:string;


  locations: Location[];
  
  @Input() employeeSelected : Employee;
  @Output() employeeSave = new EventEmitter();
  @Output() employeeUpdate = new EventEmitter();
  @Output() employeeUpload = new EventEmitter();



  constructor(public sanitizer: DomSanitizer,private formBuilder : FormBuilder, private employeeService : EmployeeService,private http:Http) { }

  ngOnInit() {
    this.initializeForm();
    
  }

  onEmployeeUpload(){
    this.employeeUpload.emit();
  }


  ngOnChanges(){
    if(this.employeeSelected!=undefined){
      this.form.setValue({
        firstName: this.employeeSelected.firstName,
        subDivision: this.employeeSelected.subDivision,
        lastName: this.employeeSelected.lastName,
        status: this.employeeSelected.status,
        gender: this.employeeSelected.gender,
        suspendDate: this.employeeSelected.suspendDate,
        dob: this.employeeSelected.dob,
        hiredDate: this.employeeSelected.hiredDate,
        nationality: this.employeeSelected.nationality,
        grade: this.employeeSelected.grade,
        maritalStatus: this.employeeSelected.maritalStatus,
        division: this.employeeSelected.division,
        phone: this.employeeSelected.phone,
        email: this.employeeSelected.email,
        location: this.employeeSelected.location.locationId
      }); 
      this.imageUrlTemp = this.employeeSelected.imagePath;
    }
  }

  onSubmit(employee){
    employee.location = this.locations.find(loc=>loc.locationId==employee.location)._links.location.href;
    if(this.employeeSelected==undefined){
      employee.imagePath = this.imageUrl;
      if(employee.imagePath!=undefined){
        employee.imagePath = "http://localhost:4200/api/image/".concat(employee.imagePath);
        this.employeeService.uploadImage(this.imageFile,this.imageUrl)
          .then(result=>{
            this.employeeSave.emit(employee);
            this.imageUrl = undefined;
            this.imageFile = undefined;
            this.imageUrlTemp = undefined;
            this.imageName = undefined;
            this.employeeSelected = undefined;
          });
      }else{
        this.employeeSave.emit(employee);
      }
    }else{
      employee._links = this.employeeSelected._links;
      employee.imagePath = this.imageUrl==undefined ? this.employeeSelected.imagePath : "http://localhost:4200/api/image/".concat(this.imageUrl);
      if(employee.imagePath!=undefined && this.imageUrl!=undefined){
        this.employeeService.uploadImage(this.imageFile,this.imageUrl)
          .then(result=>{
            this.employeeSave.emit(employee);
            this.imageUrl = undefined;
            this.imageFile = undefined;
            this.imageUrlTemp = undefined;
            this.imageName = undefined;
            this.employeeSelected = undefined;
          });
      }else{
        this.employeeSave.emit(employee);
      }
    }
  }

  onImageChoose(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
        this.imageUrlTemp = event.target.result;
      }
      let imageType = event.target.files[0].type.split("/");
      this.imageName = this.guid();
      this.imageUrl = this.imageName.concat(".").concat(imageType[1]);
      this.imageFile = event.target.files[0];
      reader.readAsDataURL(this.imageFile);
    }
  }

  onChoose(event){
      var reader = new FileReader();

      reader.onload = (event:any) => {
        this.imageUrlTemp = event.target.result;
      }
      let imageType = event.blobTemp.type.split("/");
      this.imageName = this.guid();
      this.imageUrl = this.imageName.concat(".").concat(imageType[1]);
      this.imageFile = event.fileTemp;
      reader.readAsDataURL(this.imageFile);
  }


 guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
        }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
    }

    initializeForm(){   
        this.form = this.formBuilder.group({
        firstName: this.formBuilder.control('',Validators.required),
        subDivision: this.formBuilder.control(''),
        lastName: this.formBuilder.control(''),
        status: this.formBuilder.control('',Validators.required),
        gender: this.formBuilder.control(''),
        suspendDate: this.formBuilder.control(''),
        dob: this.formBuilder.control('',Validators.required),
        hiredDate: this.formBuilder.control('',Validators.required),
        nationality: this.formBuilder.control('',Validators.required),
        grade: this.formBuilder.control(''),
        maritalStatus: this.formBuilder.control('',Validators.required),
        division: this.formBuilder.control(''),
        phone: this.formBuilder.control('',Validators.required),
        email: this.formBuilder.control('',Validators.email),
        location: this.formBuilder.control('')
      });
      this.employeeService.getLocations().then(locations => {
        this.locations = locations;
        this.form.controls['location'].setValue(this.locations[0].locationId);
        this.form.controls['grade'].setValue("SE-JP");
        this.form.controls['division'].setValue("SWD-Red");
        this.form.controls['gender'].setValue("Male");
      });
      this.imageUrlTemp = undefined;
      
    }


}
