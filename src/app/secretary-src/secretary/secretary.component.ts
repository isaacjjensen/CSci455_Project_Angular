import { Component, OnInit } 	from '@angular/core';

import { Secretary } 			  from '../secretary';
import { SecretaryService }	from '../secretary.service';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css']
})
export class SecretaryComponent implements OnInit {

  secretaries: Secretary[];
 
  constructor(private secretaryService: SecretaryService) { }
 
  ngOnInit() {
    this.getSecretaries();
  }
 
  getSecretaries(): void {
    this.secretaryService.getSecretaries()
    .subscribe(secretaries => this.secretaries = secretaries);
  }
 
  add(id: string, name: string, phone: string, address: string, start_date: string, dept_id: string): void {
    id = id.trim();
    name = name.trim();
    phone = phone.trim();
    address = address.trim();
    start_date = start_date.trim();
    dept_id = dept_id.trim();
    this.secretaryService.addSecretary({ id, name, phone, address, start_date, dept_id } as Secretary)
      .subscribe(secretary => {
        this.secretaries.push(secretary);
      });
  }
 
  delete(secretary: Secretary): void {
    this.secretaries = this.secretaries.filter(s => s !== secretary);
    this.secretaryService.deleteSecretary(secretary).subscribe();
  }
 
}