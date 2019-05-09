import { Component, OnInit } 	from '@angular/core';

import { Prescription } 			  from '../prescription';
import { PrescriptionService }	from '../prescription.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
  prescriptions: Prescription[];
 
  constructor(private prescriptionService: PrescriptionService) { }
 
  ngOnInit() {
    this.getPrescriptions();
  }
 
  getPrescriptions(): void {
    this.prescriptionService.getPrescriptions()
    .subscribe(prescriptions => this.prescriptions = prescriptions);
  }
 
  add(id: string, start_date: string, end_date: string, medication: string,
  	  dosage: number, interval: string, doc_id: string, pat_id: string): void {
    id = id.trim();
    start_date = start_date.trim();
    end_date = end_date.trim();
    medication = medication.trim();
    interval = interval.trim();
    doc_id = doc_id.trim();
    pat_id = pat_id.trim();
    this.prescriptionService.addPrescription({ id, start_date, end_date, medication, dosage, interval, doc_id, pat_id } as Prescription)
      .subscribe(prescription => {
        this.prescriptions.push(prescription);
      });
  }
 
  delete(prescription: Prescription): void {
    this.prescriptions = this.prescriptions.filter(a => a !== prescription);
    this.prescriptionService.deletePrescription(prescription).subscribe();
  }
 
}