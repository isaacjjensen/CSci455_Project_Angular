import { Component, OnInit, Input } 	from '@angular/core';
import { ActivatedRoute } 				from '@angular/router';
import { Location } 					from '@angular/common';
 
import { Nurse }         				from '../nurse';
import { NurseService }  				from '../nurse.service';

@Component({
  selector: 'app-nurse-detail',
  templateUrl: './nurse-detail.component.html',
  styleUrls: ['./nurse-detail.component.css']
})
export class NurseDetailComponent implements OnInit {
  @Input() nurse: Nurse;
 
  constructor(
    private route: ActivatedRoute,
    private nurseService: NurseService,
    private location: Location
  ) {}
 
  ngOnInit(): void {
    this.getNurse();
  }
 
  getNurse(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.nurseService.getNurse(id)
      .subscribe(nurse => this.nurse = nurse);
  }
 
  goBack(): void {
    this.location.back();
  }
 
 save(): void {
    this.nurseService.updateNurse(this.nurse)
      .subscribe(() => this.goBack());
  }
}