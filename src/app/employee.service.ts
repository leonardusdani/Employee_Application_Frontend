import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Employee} from './employee'

@Injectable()
export class EmployeeService {

  private employeeUrl = "api/employees";
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  uploadImage(imageFile: File,imageName:string):Promise<any>{
    let formData:FormData = new FormData();
    formData.append('file', imageFile, imageName);
    return this.http.post("/api/upload-image", formData)
      .toPromise()
      .then((res) => res)
      .catch(this.handleError)
  }

  update(employee): Promise<Employee> {
  return this.http
    .put(employee._links.self.href, JSON.stringify(employee), {headers: this.headers})
    .toPromise()
    .then(res => {
      return res.json().data as Employee;
    })
    .catch(this.handleError);
  }

  create(employee): Promise<Employee> {
  return this.http
    .post(this.employeeUrl, JSON.stringify(employee), {headers: this.headers})
    .toPromise()
    .then(res => {
      return res.json() as Employee;
    })
    .catch(this.handleError);
  }

  delete(employee : Employee):Promise<any>{
    return this.http.delete(employee._links.self.href)
                .toPromise()
                .then(()=>null)
                .catch(this.handleError);
  }

  get():Promise<Employee[]>{
    return this.http.get(this.employeeUrl)
               .toPromise()
               .then(response => response.json()._embedded.employees as Employee[])
               .catch(this.handleError);
  }

  getAllSortByLastName(sortParam:String):Promise<Employee[]>{
    const urlSort = `${this.employeeUrl}?sort=lastName,${sortParam}`;
    return this.http.get(urlSort)
               .toPromise()
               .then(response => response.json()._embedded.employees as Employee[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  employees =  [
    { id: 1, firstName: "Leonardus", subDivision: "Java Bootcamp" ,lastName: "Dani", status: "Permanent", gender: "Male", suspendDate: new Date("February 7, 2016 10:13:00"), dob: new Date("February 7, 2016 10:13:00"), hiredDate: new Date("February 4, 2016 10:13:00"), nationality: "Indonesian", grade: "SE-JP", maritalStatus: "Single", division: "Swd-Red", phone: "+62899511511", email: "leonardus.dani@mitrais.com", location: "Jakarta" },
    { id: 2, firstName: "Dani", subDivision: "Java Bootcamp" ,lastName: "Novianto", status: "Permanent", gender: "Male", suspendDate: new Date("February 7, 2016 10:13:00"), dob: new Date("February 7, 2016 10:13:00"), hiredDate: new Date("February 4, 2016 10:13:00"), nationality: "Indonesian", grade: "SE-JP", maritalStatus: "Single", division: "Swd-Red", phone: "+62899511511", email: "leonardus.dani@mitrais.com", location: "Jakarta" },
    { id: 3, firstName: "Ardi", subDivision: "Java Bootcamp" ,lastName: "Pratama", status: "Permanent", gender: "Male", suspendDate: new Date("February 7, 2016 10:13:00"), dob: new Date("February 7, 2016 10:13:00"), hiredDate: new Date("February 4, 2016 10:13:00"), nationality: "Indonesian", grade: "SE-JP", maritalStatus: "Single", division: "Swd-Red", phone: "+62899511511", email: "leonardus.dani@mitrais.com", location: "Jakarta" },
    { id: 4, firstName: "Steven", subDivision: "Java Bootcamp" ,lastName: "Indra", status: "Permanent", gender: "Male", suspendDate: new Date("February 7, 2016 10:13:00"), dob: new Date("February 7, 2016 10:13:00"), hiredDate: new Date("February 4, 2016 10:13:00"), nationality: "Indonesian", grade: "SE-JP", maritalStatus: "Single", division: "Swd-Red", phone: "+62899511511", email: "leonardus.dani@mitrais.com", location: "Jakarta" }
  ]; 
}
