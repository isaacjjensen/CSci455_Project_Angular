import { Component, OnInit } 	from '@angular/core';

import { Nurse } 			  	from '../nurse';
import { NurseService }			from '../nurse.service';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {
  nurses: Nurse[];
 
  constructor(private nurseService: NurseService) { }
 
  ngOnInit() {
    this.getNurses();
  }
 
  getNurses(): void {
    this.nurseService.getNurses()
    .subscribe(nurses => this.nurses = nurses);
  }
 
  add(id: string, name: string, start_date: string, 
  	  address: string, phone: string, dept_id: string): void {
    id = id.trim();
    name = name.trim();
    start_date = start_date.trim();
    address = address.trim();
    phone = phone.trim();
    dept_id = dept_id.trim();
    this.nurseService.addNurse({ id, name, start_date, address, phone, dept_id } as Nurse)
      .subscribe(nurse => {
        this.nurses.push(nurse);
      });
  }
 
  delete(nurse: Nurse): void {
    this.nurses = this.nurses.filter(n => n !== nurse);
    this.nurseService.deleteNurse(nurse).subscribe();
  }
 
}