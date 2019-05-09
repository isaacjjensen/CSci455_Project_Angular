import { BrowserModule }                  from '@angular/platform-browser';
import { FormsModule }                    from '@angular/forms';
import { NgModule }                       from '@angular/core';
import { HttpClientModule }               from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }            from './in-memory-data.service';

// General App imports
import { AppComponent }                   from './app.component';
import { AppRoutingModule }               from './app-routing.module';
import { MessagesComponent }              from './messages/messages.component';

// Imports for particular Objects
// Appointment
import { AppointmentComponent }           from './appointment-src/appointment/appointment.component';
import { AppointmentDetailComponent }     from './appointment-src/appointment-detail/appointment-detail.component';
// Department
import { DepartmentComponent }            from './department-src/department/department.component';
import { DepartmentDetailComponent }      from './department-src/department-detail/department-detail.component';
// Doctor
import { DoctorComponent }                from './doctor-src/doctor/doctor.component';
import { DoctorDetailComponent }          from './doctor-src/doctor-detail/doctor-detail.component';
import { DoctorSearchComponent }          from './doctor-src/doctor-search/doctor-search.component';
// Institution
import { InstitutionComponent }           from './institution-src/institution/institution.component';
import { InstitutionDetailComponent }     from './institution-src/institution-detail/institution-detail.component';
// Patient
import { PatientComponent }               from './patient-src/patient/patient.component';
import { PatientDetailComponent }         from './patient-src/patient-detail/patient-detail.component';
import { PatientSearchComponent }         from './patient-src/patient-search/patient-search.component';
import { MedicalRecordComponent }         from './patient-src/medical-record/medical-record.component';
// Nurse
import { NurseComponent }                 from './nurse-src/nurse/nurse.component';
import { NurseDetailComponent }           from './nurse-src/nurse-detail/nurse-detail.component';
// Payment
import { PaymentComponent }               from './payment-src/payment/payment.component';
import { PaymentDetailComponent }         from './payment-src/payment-detail/payment-detail.component';
// Pharmacy
import { PharmacyComponent }              from './pharmacy-src/pharmacy/pharmacy.component';
import { PharmacyDetailComponent }        from './pharmacy-src/pharmacy-detail/pharmacy-detail.component';
// Prescription
import { PrescriptionComponent }          from './prescription-src/prescription/prescription.component';
import { PrescriptionDetailComponent }    from './prescription-src/prescription-detail/prescription-detail.component';
// Secretary
import { SecretaryComponent }             from './secretary-src/secretary/secretary.component';
import { SecretaryDetailComponent }       from './secretary-src/secretary-detail/secretary-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
    AppointmentDetailComponent,
    DoctorComponent,
    DoctorDetailComponent,
    PatientComponent,
    PatientDetailComponent,
    MessagesComponent,
    PatientSearchComponent,
    DoctorSearchComponent,
    MedicalRecordComponent,
    DepartmentComponent,
    DepartmentDetailComponent,
    InstitutionDetailComponent,
    NurseComponent,
    NurseDetailComponent,
    PaymentComponent,
    PaymentDetailComponent,
    PharmacyComponent,
    PharmacyDetailComponent,
    PrescriptionComponent,
    PrescriptionDetailComponent,
    SecretaryComponent,
    SecretaryDetailComponent,
    InstitutionComponent
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
