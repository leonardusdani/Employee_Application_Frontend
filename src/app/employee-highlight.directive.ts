import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[employeeHighlight]'
})
export class EmployeeHighlightDirective {

  constructor() { }

  @HostBinding('class.employee-selected') employeeSelected = false;

  @HostBinding('class.employee-hovering') hovering = false;

  @HostListener('mouseenter') onMouseEnter() {
    this.hovering = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hovering = false;
  }

  @Input() set employeeHighlight(value) {
    this.employeeSelected = value;
  }

}
