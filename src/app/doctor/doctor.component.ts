import { Component, OnInit } from '@angular/core';
 
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctors: Doctor[];
 
  constructor(private doctorService: DoctorService) { }
 
  ngOnInit() {
    this.getDoctors();
  }
 
  getDoctors(): void {
    this.doctorService.getDoctors()
    .subscribe(doctors => this.doctors = doctors);
  }
 
}