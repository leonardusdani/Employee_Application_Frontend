import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  employee: { id: number, firstName: string, lastName: string, grade: string, division: string, location: string, phone: string, hiredDate: Date };

  constructor() { 
    this.employee = { "id": 1, "firstName": "Leonardus", "lastName": "Dani Novianto", "grade": "SE-JP", "division": "Swd-Red", "location": "Jakarta", "phone": "+62899511511", "hiredDate": new Date("February 4, 2016 10:13:00") };
  }

  ngOnInit() {
  }

}
