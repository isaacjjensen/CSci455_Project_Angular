import { Component, OnInit, Input } 		from '@angular/core';
import { ActivatedRoute } 				    from '@angular/router';
import { Location } 					    from '@angular/common';
 
import { Institution }         				from '../institution';
import { InstitutionService }  				from '../institution.service';

@Component({
  selector: 'app-institution-detail',
  templateUrl: './institution-detail.component.html',
  styleUrls: ['./institution-detail.component.css']
})
export class InstitutionDetailComponent implements OnInit {
  @Input() institution: Institution;
 
  constructor(
    private route: ActivatedRoute,
    private institutionService: InstitutionService,
    private location: Location
  ) {}
 
  ngOnInit(): void {
    this.getInstitution();
  }
 
  getInstitution(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.institutionService.getInstitution(id)
      .subscribe(institution => this.institution = institution);
  }
 
  goBack(): void {
    this.location.back();
  }
 
 save(): void {
    this.institutionService.updateInstitution(this.institution)
      .subscribe(() => this.goBack());
  }
}