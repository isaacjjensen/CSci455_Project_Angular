import { Component, OnInit } 	from '@angular/core';
 
import { Patient } 				from '../patient';
import { PatientService } 		from '../patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patients: Patient[];
 
  constructor(private patientService: PatientService) { }
 
  ngOnInit() {
    this.getPatients();
  }
 
  getPatients(): void {
    this.patientService.getPatients()
    .subscribe(patients => this.patients = patients);
  }
 
  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.heroService.addHero({ name } as Hero)
  //     .subscribe(hero => {
  //       this.heroes.push(hero);
  //     });
  // }
}