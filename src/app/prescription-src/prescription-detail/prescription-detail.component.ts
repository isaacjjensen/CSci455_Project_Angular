import { Component, OnInit, Input } 		from '@angular/core';
import { ActivatedRoute } 				    from '@angular/router';
import { Location } 					    from '@angular/common';
 
import { Prescription }         				from '../prescription';
import { PrescriptionService }  				from '../prescription.service';

@Component({
  selector: 'app-prescription-detail',
  templateUrl: './prescription-detail.component.html',
  styleUrls: ['./prescription-detail.component.css']
})
export class PrescriptionDetailComponent implements OnInit {
  @Input() prescription: Prescription;
 
  constructor(
    private route: ActivatedRoute,
    private prescriptionService: PrescriptionService,
    private location: Location
  ) {}
 
  ngOnInit(): void {
    this.getPrescription();
  }
 
  getPrescription(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.prescriptionService.getPrescription(id)
      .subscribe(prescription => this.prescription = prescription);
  }
 
  goBack(): void {
    this.location.back();
  }
 
 save(): void {
    this.prescriptionService.updatePrescription(this.prescription)
      .subscribe(() => this.goBack());
  }
}