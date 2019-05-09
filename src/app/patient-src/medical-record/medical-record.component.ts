import { Component, OnInit, Input }   from '@angular/core';
import { ActivatedRoute }             from '@angular/router';
import { Location }                   from '@angular/common';
 
import { MedicalRecord }              from '../medical-record';
import { MedicalRecordService }       from '../medical-record.service';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent implements OnInit {
  @Input() medicalRecord: MedicalRecord;
 
  constructor(
    private route: ActivatedRoute,
    private medicalRecordService: MedicalRecordService,
    private location: Location
  ) {}
 
  ngOnInit(): void {
    this.getMedicalRecord();
  }
 
  getMedicalRecord(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.medicalRecordService.getMedicalRecord(id)
      .subscribe(medicalRecord => this.medicalRecord = medicalRecord);
  }
 
  goBack(): void {
    this.location.back();
  }
 
  save(): void {
    this.medicalRecordService.updateMedicalRecord(this.medicalRecord)
      .subscribe(() => this.goBack());
  }
}