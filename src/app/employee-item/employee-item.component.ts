import { Component, EventEmitter, Input, OnInit ,Output  } from '@angular/core';

import { Employee } from '../employee';

@Component({
  selector: 'employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.css']
})
export class EmployeeItemComponent implements OnInit {

  @Input() employee:Employee;
  @Output() employeeSelect = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onEmployeeSelect(){
    this.employeeSelect.emit(this.employee);
  }
  

}
