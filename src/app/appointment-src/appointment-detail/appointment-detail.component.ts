import { Component, OnInit, Input } 	from '@angular/core';
import { ActivatedRoute } 				    from '@angular/router';
import { Location } 					        from '@angular/common';
 
import { Appointment }         				from '../appointment';
import { AppointmentService }  				from '../appointment.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {
  @Input() appointment: Appointment;
 
  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private location: Location
  ) {}
 
  ngOnInit(): void {
    this.getAppointment();
  }
 
  getAppointment(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.appointmentService.getAppointment(id)
      .subscribe(appointment => this.appointment = appointment);
  }
 
  goBack(): void {
    this.location.back();
  }
 
 save(): void {
    this.appointmentService.updateAppointment(this.appointment)
      .subscribe(() => this.goBack());
  }
}