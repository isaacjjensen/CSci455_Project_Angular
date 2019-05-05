import { Component, OnInit } 	from '@angular/core';
import { Appointment } 			from '../appointment';
import { AppointmentService } 	from '../appointment.service';
import { Doctor }				from '../doctor';
import { DoctorService }		from '../doctor.service';
import { Patient }				from '../patient';
import { PatientService }		from '../patient.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  appointments: Appointment[] 	= [];
  doctors:		Doctor[]		= [];
  patients:		Patient[]		= [];
 
  constructor(
  	private appointmentService: AppointmentService,
  	private doctorService: 		DoctorService,
  	private patientService: 	PatientService) { }
 
  ngOnInit() {
    this.getAppointments();
    this.getDoctors();
    this.getPatients();
  }
 
  getAppointments(): void {
    this.appointmentService.getAppointments()
      .subscribe(appointments => this.appointments = appointments.slice(1, 5));
  }

  getDoctors(): void {
  	this.doctorService.getDoctors()
  	  .subscribe(doctors => this.doctors = doctors.slice(1, 5));
  }

  getPatients(): void {
  	this.patientService.getPatients()
  	  .subscribe(patients => this.patients = patients.slice(1, 5));
  }
}