import { Component, OnInit } 	from '@angular/core';

import { Appointment } 			  from '../appointment';
import { AppointmentService }	from '../appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointments: Appointment[];
 
  constructor(private appointmentService: AppointmentService) { }
 
  ngOnInit() {
    this.getAppointments();
  }
 
  getAppointments(): void {
    this.appointmentService.getAppointments()
    .subscribe(appointments => this.appointments = appointments);
  }
 
  add(id: string, doc_id: string, inst_id: string, date: string, time: string): void {
    id = id.trim();
    doc_id = doc_id.trim();
    inst_id = inst_id.trim();
    date = date.trim();
    time = time.trim();
    if (!id && !date && !time) { return; }
    this.appointmentService.addAppointment({ id, doc_id, inst_id, date, time } as Appointment)
      .subscribe(appointment => {
        this.appointments.push(appointment);
      });
  }
 
  delete(appointment: Appointment): void {
    this.appointments = this.appointments.filter(a => a !== appointment);
    this.appointmentService.deleteAppointment(appointment).subscribe();
  }
 
}