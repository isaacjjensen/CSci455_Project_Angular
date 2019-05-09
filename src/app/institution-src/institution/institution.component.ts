import { Component, OnInit } 		from '@angular/core';

import { Institution } 			  	from '../institution';
import { InstitutionService }		from '../institution.service';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css']
})
export class InstitutionComponent implements OnInit {
  institutions: Institution[];
 
  constructor(private institutionService: InstitutionService) { }
 
  ngOnInit() {
    this.getInstitutions();
  }
 
  getInstitutions(): void {
    this.institutionService.getInstitutions()
    .subscribe(institutions => this.institutions = institutions);
  }
 
  add(id: string, inst_name: string, phone: string, address: string): void {
    id = id.trim();
    inst_name = inst_name.trim();
    phone = phone.trim();
    address = address.trim();
    this.institutionService.addInstitution({ id, inst_name, phone, address } as Institution)
      .subscribe(institution => {
        this.institutions.push(institution);
      });
  }
 
  delete(institution: Institution): void {
    this.institutions = this.institutions.filter(i => i !== institution);
    this.institutionService.deleteInstitution(institution).subscribe();
  }
 
}