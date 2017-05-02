import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EmployeeItemComponent } from './employee-item/employee-item.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { EmployeeToolbarComponent } from './employee-toolbar/employee-toolbar.component';
import { ContentNavbarComponent } from './content-navbar/content-navbar.component';
import { EmployeeService } from './employee.service';
import { EmployeeHighlightDirective } from './employee-highlight.directive';
import { PopupComponent } from './popup/popup.component';
import { ModalModule } from 'ngx-bootstrap';
import {ImageCropperComponent} from 'ng2-img-cropper';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeItemComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    MainHeaderComponent,
    EmployeeToolbarComponent,
    ContentNavbarComponent,
    EmployeeHighlightDirective,
    PopupComponent,
    ImageCropperComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot()
  ],
  providers: [
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
