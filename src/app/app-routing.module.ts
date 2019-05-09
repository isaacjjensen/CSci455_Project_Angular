import { NgModule } 					from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';

import { AppointmentComponent }			from './appointment-src/appointment/appointment.component';
import { AppointmentDetailComponent } 	from './appointment-src/appointment-detail/appointment-detail.component';

import { DepartmentComponent }			from './department-src/department/department.component';
import { DepartmentDetailComponent }	from './department-src/department-detail/department-detail.component';

import { DoctorComponent }				from './doctor-src/doctor/doctor.component';
import { DoctorDetailComponent }		from './doctor-src/doctor-detail/doctor-detail.component';

import { InstitutionComponent }			from './institution-src/institution/institution.component';
import { InstitutionDetailComponent }	from './institution-src/institution-detail/institution-detail.component';

import { NurseComponent }				from './nurse-src/nurse/nurse.component';
import { NurseDetailComponent }			from './nurse-src/nurse-detail/nurse-detail.component';

import { PatientComponent }				from './patient-src/patient/patient.component';
import { PatientDetailComponent }		from './patient-src/patient-detail/patient-detail.component';
import { MedicalRecordComponent }		from './patient-src/medical-record/medical-record.component';

import { PaymentComponent }				from './payment-src/payment/payment.component';
import { PaymentDetailComponent }		from './payment-src/payment-detail/payment-detail.component';

import { PharmacyComponent }			from './pharmacy-src/pharmacy/pharmacy.component';
import { PharmacyDetailComponent }		from './pharmacy-src/pharmacy-detail/pharmacy-detail.component';

import { PrescriptionComponent }		from './prescription-src/prescription/prescription.component';
import { PrescriptionDetailComponent }	from './prescription-src/prescription-detail/prescription-detail.component';

import { SecretaryComponent }			from './secretary-src/secretary/secretary.component';
import { SecretaryDetailComponent }		from './secretary-src/secretary-detail/secretary-detail.component';

const routes: Routes = [
	{ path: '', redirectTo: '/appointments', pathMatch: 'full' },
	{ path: 'appointments', component: AppointmentComponent },
	{ path: 'appointment-detail/:id', component: AppointmentDetailComponent },
	{ path: 'departments', component: DepartmentComponent },
	{ path: 'department-detail/:id', component: DepartmentDetailComponent },
	{ path: 'doctors', component: DoctorComponent },
	{ path: 'doctor-detail/:id', component: DoctorDetailComponent },
	{ path: 'institutions', component: InstitutionComponent },
	{ path: 'institution-detail/:id', component: InstitutionDetailComponent },
	{ path: 'nurses', component: NurseComponent },
	{ path: 'nurse-detail/:id', component: NurseDetailComponent },
	{ path: 'patients', component: PatientComponent },
	{ path: 'patient-detail/:id', component: PatientDetailComponent },
	{ path: 'patient-medical-record/:id', component: MedicalRecordComponent },
	{ path: 'patient-payment/:id', component: PaymentComponent },
	{ path: 'patient-payment/:id/:date', component: PaymentDetailComponent },
	{ path: 'patient-prescription/:id', component: PrescriptionComponent },
	{ path: 'patient-prescription/:id/:medication', component: PrescriptionDetailComponent },
	{ path: 'pharmacies', component: PharmacyComponent },
	{ path: 'pharmacy-detail/:id', component: PharmacyDetailComponent },
	{ path: 'secretaries', component: SecretaryComponent },
	{ path: 'secretary-detail/:id', component: SecretaryDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
