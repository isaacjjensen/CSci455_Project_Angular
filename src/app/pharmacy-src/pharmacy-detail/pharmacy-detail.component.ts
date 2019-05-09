import { Component, OnInit, Input } 	from '@angular/core';
import { ActivatedRoute } 				    from '@angular/router';
import { Location } 					        from '@angular/common';
 
import { Pharmacy }         				from '../pharmacy';
import { PharmacyService }  				from '../pharmacy.service';

@Component({
  selector: 'app-pharmacy-detail',
  templateUrl: './pharmacy-detail.component.html',
  styleUrls: ['./pharmacy-detail.component.css']
})
export class PharmacyDetailComponent implements OnInit {
  @Input() pharmacy: Pharmacy;
 
  constructor(
    private route: ActivatedRoute,
    private pharmacyService: PharmacyService,
    private location: Location
  ) {}
 
  ngOnInit(): void {
    this.getPharmacy();
  }
 
  getPharmacy(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pharmacyService.getPharmacy(id)
      .subscribe(pharmacy => this.pharmacy = pharmacy);
  }
 
  goBack(): void {
    this.location.back();
  }
 
 save(): void {
    this.pharmacyService.updatePharmacy(this.pharmacy)
      .subscribe(() => this.goBack());
  }
}