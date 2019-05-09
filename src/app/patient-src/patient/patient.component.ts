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
 
  add(name: string, id: string, gender: string, phone: string,
      birthdate: string, address: string, ssn: string, insurance: string): void {
    name = name.trim();
    id = id.trim();
    gender = gender.trim();
    phone = phone.trim();
    birthdate = birthdate.trim();
    address = address.trim();
    ssn = ssn.trim();
    insurance = insurance.trim();
    if (!name) { return; }
    this.patientService.addPatient({ id, name, gender, phone, birthdate, 
                                    address, ssn, insurance } as Patient)
      .subscribe(hero => {
        this.patients.push(hero);
      });
  }
}