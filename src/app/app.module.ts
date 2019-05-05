import { BrowserModule }                  from '@angular/platform-browser';
import { FormsModule }                    from '@angular/forms';
import { NgModule }                       from '@angular/core';
import { HttpClientModule }               from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }            from './in-memory-data.service';

import { AppComponent }                   from './app.component';
import { PatientComponent }               from './patient/patient.component';
import { AppointmentComponent }           from './appointment/appointment.component';
import { DoctorComponent }                from './doctor/doctor.component';
import { PatientDetailComponent }         from './patient-detail/patient-detail.component';
import { AppointmentDetailComponent }     from './appointment-detail/appointment-detail.component';
import { DoctorDetailComponent }          from './doctor-detail/doctor-detail.component';
import { MessagesComponent }              from './messages/messages.component';
import { AppRoutingModule }               from './app-routing.module';
import { DashboardComponent }             from './dashboard/dashboard.component';
import { PatientSearchComponent }         from './patient-search/patient-search.component';
import { DoctorSearchComponent }          from './doctor-search/doctor-search.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
    AppointmentDetailComponent,
    DashboardComponent,
    DoctorComponent,
    DoctorDetailComponent,
    PatientComponent,
    PatientDetailComponent,
    MessagesComponent,
    PatientSearchComponent,
    DoctorSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
