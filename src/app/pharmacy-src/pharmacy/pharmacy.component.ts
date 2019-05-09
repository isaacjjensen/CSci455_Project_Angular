import { Component, OnInit } 	from '@angular/core';

import { Pharmacy } 			  from '../pharmacy';
import { PharmacyService }	from '../pharmacy.service';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {
  pharmacies: Pharmacy[];
 
  constructor(private pharmacyService: PharmacyService) { }
 
  ngOnInit() {
    this.getPharmacies();
  }
 
  getPharmacies(): void {
    this.pharmacyService.getPharmacies()
    .subscribe(pharmacies => this.pharmacies = pharmacies);
  }
 
  add(id: string, name: string, address: string, phone: string): void {
    id = id.trim();
    name = name.trim();
    address = address.trim();
    phone = phone.trim();
    this.pharmacyService.addPharmacy({  } as Pharmacy)
      .subscribe(pharmacy => {
        this.pharmacies.push(pharmacy);
      });
  }
 
  delete(pharmacy: Pharmacy): void {
    this.pharmacies = this.pharmacies.filter(a => a !== pharmacy);
    this.pharmacyService.deletePharmacy(pharmacy).subscribe();
  }
 
}