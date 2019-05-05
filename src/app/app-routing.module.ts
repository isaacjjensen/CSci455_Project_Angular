import { NgModule } 					from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';

import { AppointmentComponent }			from './appointment/appointment.component';
import { AppointmentDetailComponent } 	from './appointment-detail/appointment-detail.component';
import { DashboardComponent } 			from './dashboard/dashboard.component';
import { DoctorComponent }				from './doctor/doctor.component';
import { DoctorDetailComponent }		from './doctor-detail/doctor-detail.component';
import { PatientComponent }				from './patient/patient.component';
import { PatientDetailComponent }		from './patient-detail/patient-detail.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'appointments', component: AppointmentComponent },
	{ path: 'appointment-detail/:pat_id', component: AppointmentDetailComponent },
	{ path: 'doctors', component: DoctorComponent },
	{ path: 'doctor-detail/:id', component: DoctorDetailComponent },
	{ path: 'patients', component: PatientComponent },
	{ path: 'patient-detail/:id', component: PatientDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
