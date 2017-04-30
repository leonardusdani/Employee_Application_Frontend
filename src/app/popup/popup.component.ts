import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


import { ModalDirective } from 'ngx-bootstrap/modal';

import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

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
  @Output() employeeUpload = new EventEmitter();

  @ViewChild('childModal') public childModal:ModalDirective;
  @ViewChild('childModalFilter') public childModalFilter:ModalDirective;
  @ViewChild('childModalImage') public childModalImage:ModalDirective;

  employee : Employee;

  locations: Location[];

  data:any;
  cropperSettings : CropperSettings;
 
@ViewChild(ImageCropperComponent) cropper:ImageCropperComponent;

  constructor(private employeeService:EmployeeService,private formBuilder : FormBuilder) { 
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;

        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;
        this.cropperSettings.croppedWidth =48;
        this.cropperSettings.croppedHeight = 48;
        this.cropperSettings.canvasWidth = 200;
        this.cropperSettings.canvasHeight = 200;
        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
        this.cropperSettings.rounded = true;
        this.data = {};

  }

  

  onWell(){
    //var imageBase64 = "image base64 data";
    fetch(this.data.image)
    .then(res => res.blob())
    .then(blob => {
      console.log(blob);
      var file = new File([blob], this.data.filename);
      var outputtemp: {fileTemp:any,blobTemp:any}={fileTemp:file,blobTemp:blob};
      
      outputtemp.fileTemp = file;
      outputtemp.blobTemp = blob;
      this.employeeUpload.emit(outputtemp);
      console.log(file);
    // this.employeeService.uploadImage(file,this.data.filename)
    //       .then(result=>{
    //         console.log(result);
    //       });
    this.childModalImage.hide();

    });
    //console.log(this.data);
    //var blob = new Blob([this.data.image], {type: this.data.type});
    //var file = new File([blob], this.data.filename);
    //console.log("RESULT");
    //console.log(file);
    // this.employeeService.uploadImage(file,this.data.filename)
    //       .then(result=>{
    //         //console.log(result);
    //       });
    // this.childModalImage.hide();
}
 
fileChangeListener(event) {
    var image:any = new Image();
    var file:File = event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);
 
    };
    
    myReader.readAsDataURL(file);
    this.data.type = file.type;
    this.data.filename = file.name;
    console.log(file);
    
    // this.employeeService.uploadImage(image,"test.jpg")
    //       .then(result=>{
    //         console.log(result);
    //       });
}




  ngOnInit() {
    this.initializeForm();
  }

  showImageChildModal(){
    this.childModalImage.show();
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
    this.form.controls['location'].setValue(this.locations[0].locationId);
    this.form.controls['gender'].setValue("Male");
  }

  onSubmit(filter){
    console.log(filter);
    this.employeeFilter.emit(filter);
    this.childModalFilter.hide();
  }
  

  

}
